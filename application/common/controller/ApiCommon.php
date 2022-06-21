<?php
// +----------------------------------------------------------------------
// | Description: 解决跨域问题
// +----------------------------------------------------------------------
// | Author: linchuangbin <linchuangbin@honraytech.com>
// +----------------------------------------------------------------------

namespace app\common\controller;
use app\admin\model\Log;
use app\common\controller\Common;
use think\Request;
use think\Loader;
use think\Db;

class ApiCommon extends Common
{
    protected $id;
    protected $dept;
    protected $role;
    protected $acitons;
    protected $model = false;
    protected $validate = false;

    public function _initialize(){
        parent::_initialize();

        $request = Request::instance();

        self::checkLogin($request);

        self::checkAuth($request);

        //加载模型
        $model = Loader::parseClass($request->module(), 'model', $request->controller());
        $controller = $request->controller();
        if (class_exists($model)) {
            $this->model = model($model);
        }

        //加载验证器
        $validate = Loader::parseClass($request->module(), 'validate', $request->controller());
        if (class_exists($validate)) {
            $this->validate = validate($validate);
        }

    }



    public function index(){
        $data = $this->model->index($this->param);
        return success($data);
    }

    public function add(){
        if(!$this->model){
            return error('系统错误');
        }

        if($this->validate){
            $scene = $this->validate->scene;
            if(array_key_exists('add',$scene)){
                $result = $this->validate->scene('add')->check($this->param);
                if(!$result){
                    return error($this->validate->getError());
                }
            }
        }

        if($this->model->allowField(true)->isUpdate(false)->save($this->param)){
            return success('','添加成功');
        }else{
            return error($this->model->getError());
        }
    }

    public function edit(){
        if(!$this->model){
            return error('系统错误');
        }

        if($this->validate){
            $scene = $this->validate->scene;
            if(array_key_exists('edit',$scene)){
                $result = $this->validate->scene('edit')->check($this->param);
                if(!$result){
                    return error($this->validate->getError());
                }
            }
        }

        if($this->model->allowField(true)->isUpdate(true)->save($this->param,['id'=>$this->param['id']])){
            return success('','编辑成功');
        }else{
            return error($this->model->getError());
        }
    }

    /**
     * ids:有序字符串
     * 通用排序功能
     */
    public function handleSort(){
        $param = $this->checkParam('ids');
        $ids = str_to_int_array($param['ids']);

        $list = [];
        foreach ($ids as $key=>$id){
            $list[] = ['id' => $id, 'sort_index' => $key + 1];
        }
        if($this->model->allowField(true)->isUpdate(true)->saveAll($list)){
            return success('','排序成功');
        }else{
            return error($this->model->getError());
        }
    }

    public function delete(){
        $param = $this->checkParam('ids');

        $ids = $param['ids'];

        if(count($ids) == 0){
            return error("参数错误");
        }

        foreach ($ids as $key=>$value){
            $ids[$key] = (int)$value;
        }

        if(in_array("pid",$this->model->getDbFields())){
            $temp = [];
            $list = $this->model->field("id,pid")->select()->toArray();
            foreach ($ids as $value){
                $temp = array_merge($temp,get_children_by_parent($list,$value));
            }
            $ids = array_merge(array_unique($temp));
        }

        if($this->model->destroy($ids)){
            return success(count($ids),'删除成功');
        }else{
            return error($this->model->getError());
        }
    }

    /**
     * 通用上传功能
     * @param $dir 上传的目录
     * @param array $validate 验证规则
     * @return mixed 文件的名称或者错误信息
     *
     */
    protected function uploadFile($dir,$size=1024 * 1024 * 5,$ext='jpg,jpeg,png'){
        $res['status'] = false;
        $res['msg'] = "文件上传错误";
        $validate = [
            'size' => $size,
            'ext'=>$ext
        ];

        $path = ROOT_PATH . 'public' . DS . 'uploads' . DS . $dir;
        if(!is_dir($path)){
            if(mkdir($path, '0777')){
                if(is_writable($path)){
                    //写入文件保护
                    @file_put_contents($this->path . DS . "index.html", '');
                }else{
                    $res['msg'] = '文件夹' . $dir . '没有写入权限';
                    return $res;
                }
            }else{
                $res['msg'] = '创建文件夹' . $dir . '失败';
                return $res;
            }
        }

        $file = request()->file('file');


        if($file){
            $info = $file->validate($validate)->rule('uniqid')->move($path);
            if($info){
                $name =  $info->getSaveName();
                $res['status'] = true;
                $res['msg'] = $name;
            }else{
                $res['msg'] = $file->getError();
            }
        }
        return $res;
    }

    /**
     * 检查登录
     */
    private function checkLogin($request){
        $header = $request->header();
        $token =  $header['n-token'];
        $info = token_decrypt($token);

        if(!($token && $info)){
            exit(error('非法登录','',500));
        }

        $info = json_decode($info, true);

        if($info['expire'] - time() < 0){
            exit(error('登录超时，请重新登录','',500));
        }

        $this->id = $info['id'];
        $this->dept = $info['dept'];
        $this->role = $info['role'];
    }

    /**
     * 检查权限
     */
    private function checkAuth($request){
        if(model('admin/Setting')->where('name','super_user')->value('value') != $this->id){
            $model = $request->module();
            $controller = $request->controller();
            $action =  $request->action();

            if(isset($this->allow) && is_array($this->allow) && in_array(strtolower($action),array_map('strtolower',$this->allow))){
                //如果$action在$allow数组中 放行
            }else{
                if(isset($this->link) && is_array($this->link)){
                    foreach ($this->link as $key=>$item){
                        $item = array_map('strtolower', $item);
                        if(is_array($item) && array_search($action,$item) !== false){
                            $action = $key;
                        }
                    }
                }
                $authAction = strtolower($model . '/' . $controller . '/' . $action);
                $actions = model('admin/Role')->getActions($this->role);
                if(!in_array($authAction,$actions)){
                    exit(error('您没有操作权限','',600));
                }
            }
        }
    }


}
 