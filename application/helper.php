<?php
/**
 * Created by Nicotine.
 * Date: 2019/8/31
 * Time: 16:30
 */
function success($data,$msg=false){
    $res["data"] = $data;
    $res["msg"] = $msg;
    $res["code"] = 200;
    return json_encode($res);
}

function error($msg=false,$data=null,$code=400){
    $res["data"] = $data;
    $res["msg"] = $msg;
    $res["code"] = $code;
    return json_encode($res);
}