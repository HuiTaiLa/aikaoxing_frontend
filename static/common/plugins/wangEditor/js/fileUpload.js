
(function () {
    var E = window.wangEditor;
    var $ = window.jQuery;
    E.config.uploadFileUrl = '';
    E.config.uploadFileFileName = 'upfile';
    E.config.fileListInit = false;

    // 用 createMenu 方法创建菜单
    E.createMenu(function (check) {

        // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
        var menuId = 'fileUpload';

        // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
        if (!check(menuId)) {
            return;
        }

        // this 指向 editor 对象自身
        var editor = this;
        var url = editor.config.uploadFileUrl;
        var filename = editor.config.uploadFileFileName;

        var $dom = $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-upload"></i></a>');
        var $upfile = $('<input type="file" style="display:none">');

        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,  // 编辑器对象
            id: menuId,  // 菜单id
            title: '上传附件（文件大小不超过5M）', // 菜单标题

            // 正常状态和选中状态下的dom对象，样式需要自定义
            $domNormal: $dom,
            $domSelected: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-upload"></i></a>')
        });

        // 菜单正常状态下，点击将触发该事件
        menu.clickEvent = function (e) {
            var rangeElem = editor.getRangeElem();
            var targetElem = editor.getSelfOrParentByName(rangeElem, '.upfile');
            if (!targetElem)
                $upfile.click();
            else alert ('不要在附件链接内添加附件');
            // editor.customCommand(e, commandFn);
        };

        // 菜单选中状态下，点击将触发该事件
        menu.clickEventSelected = function (e) {
            var rangeElem = editor.getRangeElem();
            var targetElem = editor.getSelfOrParentByName(rangeElem, 'a');
            if (!targetElem)
                $upfile.click();
            else alert ('不要在附件链接内添加附件');
            // editor.customCommand(e, commandFn);
        };

        $upfile.change(function (e) {
          var str = $(this).val()
            if (str != '') {
                var formData = new FormData();
                formData.append(filename, $upfile[0].files[0]);
                $.ajax({
                url: '/api/question/get_sts_token',
                data: {
                  account:user.account,
                  companyId:user.companyId
                },
                type: 'post',
                cache: false,
                // contentType: false,
                // processData: false,
                success: function (msg) {
                  // msg = JSON.parse(msg);
                  if (msg.success) {
                      var size = $upfile[0].files[0].size/1024
                      if(size>1024*5){
                        alert("上传文件超出限制！")
                      }
                      else{
                        // console.log(str)
                        var arr = str.split("\\")
                        var title = arr[arr.length-1]
                        var suffixArr = title.split(".")
                        var suffix = suffixArr[suffixArr.length-1]
                        var name = user.companyId + "-" + user.account + "-" + nowTime + "-"
                        for(var i = 0;i<10;i++){
                          name = name + Math.floor(Math.random()*10)
                        }
                        name = name + "." + suffix
                        // console.log(name)
                        var ossUpload = new OssUpload({
                          bucket: 'kao-shi-star',
                          endpoint: 'http://oss-cn-beijing.aliyuncs.com',
                          // 如果文件大于 chunkSize 则分块上传, chunkSize 不能小于 100KB 即 102400
                          chunkSize: 1024*1024*5,
                          // 分块上传的并发数
                          concurrency: 2,
                          stsToken: msg.bizContent,
                        });
                        ossUpload.upload({
                          // 必传参数, 需要上传的文件对象
                          file: $upfile[0].files[0],
                          // 必传参数, 文件上传到 oss 后的名称, 包含路径
                          key: 'file/'+name,
                          // 上传失败后重试次数
                          maxRetry: 3,
                          // OSS支持4个 HTTP RFC2616(https://www.ietf.org/rfc/rfc2616.txt)协议规定的Header 字段：
                          // Cache-Control、Expires、Content-Encoding、Content-Disposition。
                          // 如果上传Object时设置了这些Header，则这个Object被下载时，相应的Header值会被自动设置成上传时的值
                          // 可选参数
                          headers: {
                            'CacheControl': 'public',
                            'Expires': '',
                            'ContentEncoding': '',
                            'ContentDisposition': '',
                            // oss 支持的 header, 目前仅支持 x-oss-server-side-encryption
                            'ServerSideEncryption': ''
                          },
                          // 文件上传中调用, 可选参数
                          onprogress: function (evt) {
                            console.log(evt);
                          },
                          // 文件上传失败后调用, 可选参数
                          onerror: function (evt) {
                            console.log(evt);
                          },
                          // 文件上传成功调用, 可选参数
                          oncomplete: function (res) {
                            // console.log(res);
                            var url = "https://kao-shi-star.oss-cn-beijing.aliyuncs.com/" +'file/'+name
                            editor.command(e, 'insertHtml', '<a class="upfile" href="'+ url +'" target="_blank">'+ title +'</a>');
                          }
                        });
                      }
                  }
                  else{
                    alert("系统出现问题，请联系管理员！")
                  }
                },
                error: function (err) {
                  console.log(err)
                }

              });
                // $.ajax({
                //     url: url,
                //     data: formData,
                //     type: 'post',
                //     cache: false,
                //     contentType: false,
                //     processData: false,
                //     success: function (msg) {
                //         msg = JSON.parse(msg);
                //         if (msg.success) {
                //             editor.command(e, 'insertHtml', '<a class="upfile" href="'+ msg.bizContent.url +'" target="_blank">'+ msg.bizContent.title +'</a>');
                //         } else {
                //             alert (msg.desc);
                //         }
                //     },
                //     error: function (err) {}
                //
                // });
            }
        });

        // 根据当前选区，自定义更新菜单的选中状态或者正常状态
        menu.updateSelectedEvent = function () {
            return false;
        };

        // 增加到editor对象中
        editor.menus[menuId] = menu;
    });
})();

