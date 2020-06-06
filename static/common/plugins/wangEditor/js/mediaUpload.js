(function () {
    // 获取 wangEditor 构造函数和 jquery
    var E = window.wangEditor;
    var $ = window.jQuery;
    E.config.uploadVideoUrl = '';
    E.config.uploadVideoFileName = 'upfile';

    // 用 createMenu 方法创建菜单
    E.createMenu(function (check) {

        // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
        var menuId = 'mediaUpload';

        // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
        if (!check(menuId)) {
            return;
        }

        // this 指向 editor 对象自身
        var editor = this;
        var lang = editor.config.lang;
        var url = editor.config.uploadVideoUrl;
        var filename = editor.config.uploadVideoFileName;

        var reg = /^<(iframe)|(embed)/i;

        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,  // 编辑器对象
            id: menuId,  // 菜单id
            title: '音/视频', // 菜单标题

            // 正常状态和选中装下的dom对象，样式需要自定义
            $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-play"></i></a>'),
            $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-play"></i></a>')
        });

        // panel 内容
        var $content = $('<div></div>');
        var $linkInputContainer = $('<div style="margin:20px 10px;"></div>');
        var $linkInput = $('<input type="text" class="block" placeholder=\'格式如：<iframe src="..." frameborder=0 allowfullscreen></iframe>\'/>');
        $linkInputContainer.append($linkInput);
        var $sizeContainer = $('<div style="margin:20px 10px;"></div>');
        var $widthInput = $('<input type="text" value="640" style="width:50px;text-align:center;"/>');
        var $heightInput = $('<input type="text" value="498" style="width:50px;text-align:center;"/>');
        $sizeContainer.append('<span> ' + lang.width + ' </span>')
            .append($widthInput)
            .append('<span> px &nbsp;&nbsp;&nbsp;</span>')
            .append('<span> ' + lang.height + ' </span>')
            .append($heightInput)
            .append('<span> px </span>');
        var $btnContainer = $('<div></div>');
        var $howToCopy = $('<a href="http://www.kancloud.cn/wangfupeng/wangeditor2/134973" target="_blank" style="display:inline-block;margin-top:10px;margin-left:10px;color:#999;">如何复制视频链接？</a>');
        var $btnSubmit = $('<button class="right">' + lang.submit + '</button>');
        var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>');
        var $btnUpload = $('<button type="button" class="right localupload">本地上传</button>');
        var $upfile = $('<input type="file" style="display: none">');
        $btnContainer.append($howToCopy).append($btnSubmit).append($btnCancel).append($btnUpload);
        $content.append($linkInputContainer).append($sizeContainer).append($btnContainer);



        // 取消按钮
        $btnCancel.click(function (e) {
            e.preventDefault();
            $linkInput.val('');
            menu.dropPanel.hide();
        });

        // 确定按钮
        $btnSubmit.click(function (e) {
            e.preventDefault();
            var link = $.trim($linkInput.val()).replace(/http:/,'https:');//将http协议替换为https，避免线上跨域不能请求的问题
            var $link;
            var width = parseInt($widthInput.val());
            var height = parseInt($heightInput.val());
            var $div = $('<div>');
            var html = '<p>{content}</p>';

            // 验证数据
            if (!link) {
                menu.dropPanel.focusFirstInput();
                return;
            }

            if (!reg.test(link)) {
                alert('音/视频链接格式错误！');
                menu.dropPanel.focusFirstInput();
                return;
            }

            if (isNaN(width) || isNaN(height)) {
                alert('宽度或高度不是数字！');
                return;
            }

            $link = $(link);

            // 设置高度和宽度
            $link.attr('width', width)
                .attr('height', height);

            // 拼接字符串
            html = html.replace('{content}', $div.append($link).html());

            // 执行命令
            editor.command(e, 'insertHtml', html);
            $linkInput.val('');
        });

        // 上传按钮
        $btnUpload.click(function (e) {
            // e.preventDefault();
            $upfile.click();
        });

        $upfile.change(function (e) {
            var str = $(this).val()
            if (str != '') {
                var random = parseInt(Math.random()*100001);
                var formData = new FormData();
                var type;
                formData.append(filename, $upfile[0].files[0]);
                if ($upfile[0].files[0].type.indexOf('video')!= -1)
                    type = 'video';
                else if ($upfile[0].files[0].type.indexOf('audio') != -1)
                    type = 'audio';
                else {
                    alert ('文件类型不允许');
                    return;
                }
                editor.command(e,'insertHtml', '<img class="'+type+'-uploading-img" id="'+type+'_'+random+'">');
                upload();
                function upload(){
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
                        var size = $upfile[0].files[0].size/1024/1024
                        if(size>20){
                          alert("上传音频文件超出限制！")
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
                            chunkSize: 1024*1024*20 ,//1048576
                            // 分块上传的并发数
                            concurrency: 2,
                            stsToken: msg.bizContent,
                          });
                          ossUpload.upload({
                            // 必传参数, 需要上传的文件对象
                            file: $upfile[0].files[0],
                            // 必传参数, 文件上传到 oss 后的名称, 包含路径
                            key: 'media/'+name,
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
                              var $tempimg = editor.$txt.find('#'+type+'_'+random);
                              $tempimg.remove();
                              var confirmBack = confirm("当前网络不稳定，是否重新上传？");
                              var count = 0;
                              if(confirmBack == true && count < 1){
                                //用户按了确定,重新发送请求
                                upload();
                                count++;
                              }else if(confirmBack == false && count < 1){
                                $(".video-uploading-img").addClass("hidden");
                                count++;
                              }else{

                              }
                            },
                            // 文件上传成功调用, 可选参数
                            oncomplete: function (res) {
                              // console.log(res);
                              var url = "https://kao-shi-star.oss-cn-beijing.aliyuncs.com/" +'media/'+name
                              // editor.command(e, 'insertHtml', '<a class="upfile" href="'+ url +'" target="_blank">'+ title +'</a>');
                              var $tempimg = editor.$txt.find('#'+type+'_'+random);
                              $tempimg.after('<img class="'+type+'-temp-img" temp_src="'+url+'" alt="'+title+'">');
                              $tempimg.remove();
                              $upfile.val("");//上传成功后清空value,否则同一个内容，change事件不触发
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
                    //
                    //         if (msg.success) {
                    //              var $tempimg = editor.$txt.find('#'+type+'_'+random);
                    //              $tempimg.after('<img class="'+type+'-temp-img" temp_src="'+msg.bizContent.url+'" alt="'+msg.bizContent.title+'">');
                    //              $tempimg.remove();
                    //
                    //              $upfile.val("");//上传成功后清空value,否则同一个内容，change事件不触发
                    //
                    //              //console.log('上传成功');
                    //          } else {
                    //              var $tempimg = editor.$txt.find('#'+type+'_'+random);
                    //              $tempimg.remove();
                    //              alert (msg.desc);
                    //          }
                    //     },
                    //     error: function (err) {
                    //         var confirmBack = confirm("当前网络不稳定，是否重新上传？");
                    //         var count = 0;
                    //         if(confirmBack == true && count < 1){
                    //             //用户按了确定,重新发送请求
                    //             upload();
                    //             count++;
                    //         }else if(confirmBack == false && count < 1){
                    //             $(".video-uploading-img").addClass("hidden");
                    //             count++;
                    //         }else{
                    //
                    //         }
                    //     }
                    // });
                }
            }else{
                console.log('为空')
            }
        });

        // 创建panel
        menu.dropPanel = new E.DropPanel(editor, menu, {
            $content: $content,
            width: 400
        });

        // 增加到editor对象中
        editor.menus[menuId] = menu;


    });
})();
