# todolist
打开ngnix.conf文件 添加
  location = /dt {
          proxy_pass https://api.i-lynn.cn/getIpInfo;
         }
