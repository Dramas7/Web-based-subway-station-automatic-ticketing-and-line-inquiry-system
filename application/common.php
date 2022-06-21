<?php
/**
 * 调试输出
 */
function r_dump($data, $html = false)
{
    // 定义样式
    $str = '<pre style="display: block;padding:10px;margin:20px;font-size:13px;line-height:1.5;background-color:#F5F5F5;border: 1px solid #CCC">';
    // 如果是boolean或者null直接显示文字；否则print
    if (is_bool($data)) {
        $show_data = $data ? 'true' : 'false';
    } elseif (is_null($data)) {
        $show_data = 'null';
    } else {
        if ($html) {
            $show_data = htmlentities($data);
        } else {

            $show_data = print_r($data, true);
        }
    }
    $str .= $show_data;
    $str .= '</pre>';
    echo $str;
}



/**
 * 数组转树形菜单
 */
function array_to_tree($list, $unset = array(), $pk = 'id', $pid = 'pid', $child = 'children', $root = 0)
{
    $tree = array();// 创建Tree
    if (is_array($list)) {
        // 创建基于主键的数组引用
        $refer = array();
        foreach ($list as $key => $data) {
            $refer[$data[$pk]] =& $list[$key];

        }

        foreach ($list as $key => $data) {
            // 判断是否存在parent
            $parentId = $data[$pid];
            if ($root == $parentId) {
                if (count($unset) > 0) {
                    foreach ($unset as $item) {
                        unset($list[$key][$item]);
                    }
                }
                $tree[$data[$pk]] =& $list[$key];
            } else {
                if (isset($refer[$parentId])) {
                    $parent =& $refer[$parentId];
                    if (count($unset) > 0) {
                        foreach ($unset as $item) {
                            unset($list[$key][$item]);
                        }
                    }
                    $parent[$child][] =& $list[$key];
                }
            }
        }
    }
    return array_values($tree);
}

/**
 * 入口文件夹路径
 */
function root_path()
{
    $root = str_replace('index.php', '', request()->root(true));
    if(substr($root,-1) !== '/'){
        $root .= '/';
    }
    return $root;
}

/**
 * 父类查找所有子类
 */
function get_children_by_parent($list, $id, $includeSelf = true)
{
    $tree = array_to_tree($list, ['pid'], 'id', 'pid', 'children', $id);
    $fn = function ($tree, &$res = array()) use (&$fn) {
        foreach ($tree as $value) {
            $res[] = $value['id'];
            if (array_key_exists("children", $value)) {
                $fn($value['children'], $res);
            }
        }
        return $res;
    };
    $res = $fn($tree);
    if ($includeSelf) {
        array_unshift($res, $id);
    }
    return $res;
}


/**
 * 用户密码加密
 */
function user_md5($data)
{
    return md5("nicotine_" . $data);
}

/**
 * 二维数组排序
 * @param $arrays
 * @param $sort_key
 * @param int $sort_order SORT_ASC - 默认，按升序排列  SORT_DESC - 按降序排列
 * @param int $sort_type SORT_REGULAR - 默认。将每一项按常规顺序排列。 SORT_NUMERIC - 将每一项按数字顺序排列。 SORT_STRING - 将每一项按字母顺序排列
 * @return array|bool
 */
function multi_array_sort($arrays, $sort_key, $sort_order = SORT_ASC, $sort_type = SORT_NUMERIC)
{
    if (is_array($arrays)) {
        foreach ($arrays as $array) {
            if (is_array($array)) {
                $key_arrays[] = $array[$sort_key];
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
    array_multisort($key_arrays, $sort_order, $sort_type, $arrays);
    return $arrays;
}

/**
 * 解析文件大小->标准化直接
 * @param $str
 * @return float|int
 */
function parse_size($str)
{
    if (strtolower($str[strlen($str) - 1]) == 'k') {
        return floatval($str) * 1024;
    }
    if (strtolower($str[strlen($str) - 1]) == 'm') {
        return floatval($str) * 1048576;
    }
    if (strtolower($str[strlen($str) - 1]) == 'g') {
        return floatval($str) * 1073741824;
    }
}

/**
 * 字节大小->易读大小
 * @param $size
 * @param bool $unit
 * @return string|string[]|null
 */
function readable_size($size, $unit = false)
{
    if ($size >= 1073741824) {
        $size = round($size / 1073741824 * 100) / 100 . ' GB';
    } elseif ($size >= 1048576) {
        $size = round($size / 1048576 * 100) / 100 . ' MB';
    } elseif ($size >= 1024) {
        $size = round($size / 1024 * 100) / 100 . ' KB';
    } else {
        $size = $size . ' Bytes';
    }
    if ($unit) {
        $size = preg_replace('/[^0-9\.]/', '', $size);
    }
    return $size;
}

/**
 * 获取文件夹下文件数量
 */
function get_file_number($dir)
{
    $num = 0;
    $arr = glob($dir);
    foreach ($arr as $v) {

        if (is_file($v) && stripos($v,'index.html') === False) {
            $num++;
        } else {
            $num += get_file_number($v . "/*");
        }
    }
    return $num;
}

/**
 * 获取文件夹大小
 * @param $dir
 * @return int
 */
function dir_size($dir)
{
    $size = 0;
    if (is_dir($dir)) {
        $handle = @opendir($dir);
        while (false !== ($entry = @readdir($handle))) {
            if ($entry != '.' && $entry != '..') {
                if (is_dir("{$dir}/{$entry}")) {
                    $size += dir_size("{$dir}/{$entry}");
                } else {
                    $size += filesize("{$dir}/{$entry}");
                }
            }
        }
        closedir($handle);
    }
    return $size;
}

/**
 * 循环删除文件及文件夹
 * @param $dirName 文件夹名称
 * @param bool $rootDir 是否删除根文件夹
 * @return bool
 */
function delete_dir_file($dirName, $rootDir = '')
{
    if (!is_dir($dirName)) {
        return false;
    }
    $handle = @opendir($dirName);
    while (($file = @readdir($handle)) !== false) {
        if ($file != '.' && $file != '..') {
            $dir = $dirName . '/' . $file;
            is_dir($dir) ? delete_dir_file($dir, $rootDir) : @unlink($dir);
        }
    }
    closedir($handle);
    if ($dirName !== $rootDir) {
        @rmdir($dirName);
    }
}

/**
 * 字符串转int数组
 * @param $str
 * @return array
 */
function str_to_int_array($str){
    $res = [];
    if(strlen($str)){
        $res = explode(',', $str);
        foreach ($res as $key=>$item){
            $res[$key] = (int)$item;
        }
    }
    return $res;
}


/**
 * 格式化输出日期
 * @param $time
 * @param string $format
 * @return false|string
 */
function format_date($time='', $format = 'Y-m-d H:i:s')
{
    if(strlen($time) == 0){
        $time = time();
    }
    return date($format, $time);
}

/**
 * token加密
 * @param $data
 * @return string
 */
function token_encrypt($data)
{
    $public_key = '-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTRlne29MsEH1e/IavVONB8dB+
9u8WgNm3olB1lSAviADRiI6TcO91kDWcyTb14L//+5mK3P6/QLO3Qh5plDxY9EhL
mcwRSiIiMT9zbLo8OQI5se2aGz2sKYXbgOJgOb4xJOoMDDR7pp2M0Jj4tIH94zHa
5HRTItSP2pnCKByYYwIDAQAB
-----END PUBLIC KEY-----';
    $pu_key = openssl_pkey_get_public($public_key);
    $encrypted = "";
    openssl_public_encrypt($data, $encrypted, $pu_key);//公钥加密
    $encrypted = base64_encode($encrypted);
    return $encrypted;
}

/**
 * token解密
 * @param $data
 * @return bool|string
 */
function token_decrypt($data)
{
    $private_key = '-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCTRlne29MsEH1e/IavVONB8dB+9u8WgNm3olB1lSAviADRiI6T
cO91kDWcyTb14L//+5mK3P6/QLO3Qh5plDxY9EhLmcwRSiIiMT9zbLo8OQI5se2a
Gz2sKYXbgOJgOb4xJOoMDDR7pp2M0Jj4tIH94zHa5HRTItSP2pnCKByYYwIDAQAB
AoGAHA+QehT6ZG/z41BMPUX4Uw1HA5n7Lhd45DNKD01Np6DLPyE8wT0Icyb6ABia
nzimfJisxbeb1kb2txkjAEzdPm9bhKi83yFD6JX30irxvzGS+t11k+kA1BdfaCW2
0/JFXQshCklmWMu+pa8w625zVTbwsziNVCS2m6gch9C1RQkCQQCwBz05G3XqJi8a
q7vjwbRXS8OvDhXT5zqtVNSjtfIXZyLE8dUjgWMIsZIiOU1ehWu3V/dMS//IpJSt
7MXHq6WVAkEA1i75QY7YDljdVrzhfE2BhQsPmR5DgMmopmn9RFDzNMjvPmg+5T4M
06WMYymYM1gdwlpjVTrdcsYLEZwyX0/YFwJAJNGe0K8Zvtw1xhJdvonpusiyKY98
qVIYR+ESiRupg5OjBia/Oin6GPtrYZUyxa6KlVLk+yR6X/Fs1+RKijUw8QJAcPqy
TJyW52qExt43ayRPL+jXv4MxRFwbdDzwdfrlb3CWkqrWkoIargHjfeNQ/7R5bi3T
u/+jFInXCOEFyTUK3QJBAIsyZXA7pzSvu/+/dpDZ3+F5vQ5gn/aq5+xrqqCJO3Wy
GA5nbJC14xsH0/m9TJAYgnooRfzbgXi5+N2Mzpx63+o=
-----END RSA PRIVATE KEY-----';

    $pi_key = openssl_pkey_get_private($private_key);
    $decrypted = "";
    openssl_private_decrypt(base64_decode($data), $decrypted, $pi_key);//私钥解密

    if ($decrypted && strlen($decrypted) > 0) {
        return $decrypted;
    } else {
        return false;
    }
}
