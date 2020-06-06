
  var upload_file = '';
  var qt_type = "1";
  var typeName = ['单选题', '多选题', '判断题', '填空题', '问答题'];
  var nameReg = /^\n?\s*(([0-9]+\s*[.|、])|(((\()|（)[0-9]+((\))|）)))\s*(.*?)\s*(?:\n|$)/g;
  var singleReg = /^\n?\s*(答案[:：])\s*(.*?)\s*(?:\n|$)/g;
  var fillReg = /([\(|\（]\s*[\)|\）])/g;
  var labelOpen = '0';//试题标签功能是否开启:1开启，0关闭
  var sourceFrom = '';//标记是否从弹窗点击
  // 复制考试链接
  // var clipboard = new Clipboard('#copyElement');
  // clipboard.on('success', function(e) {
  //     alert("复制成功!");
  // });
  // clipboard.on('error', function(e) {
  //     alert("复制失败,请重试");
  // });


  //如果是excel
  // if(window.location.search.indexOf("upload=excel") > 0) {
  //     $("#excel_import").show();
  //     $(".tab-content").hide();
  //     $("#showExcel").addClass("active");
  // }else {
  //     $("#showTabContent").addClass("active");
  // }

  // 尝试新的文本编辑器
  function initFroala() {
    $('div#text-input').froalaEditor({
      key: 'AODOd2HLEBFZOTGHW==',
      charCounterCount: false,
      language: 'zh_cn',
      spellcheck: false,
      toolbarInline: false,
      placeholderText: '请将所选试题复制到这里',
//                pastePlain: true,//是否为纯文本粘贴
      pasteAllowLocalImages: true,
      imageDefaultWidth: 'auto',//图片默认宽度
      imageDefaultAlign: 'left',
      wordAllowedStyleProps: [],//允许从word粘贴的标签的样式
      htmlAllowedTags: ["p", "img", "br", "sub", "sup", "div"],//允许出现的标签
//                imageMaxSize: 2 * 1024 * 1024,
      imageAllowedTypes: ["jpeg", "jpg", "png"],
      imageUploadParam: "upfile",
      imageUploadParams: {account: user.account,companyId:user.companyId},
      imageUploadURL: '/api/question/upload_img'//上传到本地服务器
    }).on('froalaEditor.contentChanged', function (e, editor) {

      setTimeout(function () {
        $('#preview').html("");
        var newArr = [];
        var indexArr = [];
        var questionArr = [];
        var detail = [];
        var contentText = editor.html.get().replace(/<p>/g, "\n\n").replace(/<\/p>/g, "\n\n").replace(/<br>/g, "\n\n").replace(/auto;">/g, 'auto;">\n\n').split('\n');
        //去除空格
        contentText.forEach(function (value) {
          if (value) {

            value = value.replace(/&nbsp;/g, ' ');
            value = '&nbsp;&nbsp;&nbsp;' + value;
            value = value.replace(/&nbsp;/g, "\n");

            newArr.push(value)
          }
        });
        //寻找相应的下标
        newArr.forEach(function (value, index) {

          if (value.match(nameReg)) {
            indexArr.push(index)
          }

        });
        //截取完整小题
        indexArr.forEach(function (value, index) {

          questionArr.push(newArr.slice(indexArr[index], indexArr[index + 1]))

        });

        $('.batch-preview-box .toolbar .title').text(questionArr.length > 0 ? '检查区(共' + questionArr.length + '题)：' : '检查区：');

        //判断题型，赋值qt_type
        questionArr.forEach(function (value) {
          var allValue = value.join(' ');
          //匹配没有答案的情况(  答案：/【答案】)
          if (!allValue.match(/\n+\s*【\s*答案\s*】\s*/g) && !allValue.match(/\n+\s*(答案[:：])\s*/g)) {
            //匹配到选项存在则默认为单选题先判断是否带有a.类似标志
            if (allValue.match(/\n+\s*[a-h]\s*[.|、]/ig)) {

              getClassify(value, detail, 1)

            } else if (fillReg.test(allValue)) {
              //在判断是否带有（）
              getClassify(value, detail, 4)
            } else {
              //否则默认为问答题
              getClassify(value, detail, 5)
            }

          } else {

            var answerReg = /^\s*\n?【\s*答案\s*】\s*/;
            var answerJude = /\n\n\n\s*【\s*答案\s*】|\n\n\n\s*答案[:：]/g;
            //针对存在多个答案的情况
            if (allValue.match(answerJude).length > 1) {
              value.forEach(function (ele, i) {

                if (ele.match(answerJude)) {

                  value = value.slice(0, i + 1)

                }

              })
            }
            value.forEach(function (val) {
              // 处理下中文括号
              if (answerReg.test(val)) {
                val = val.replace(answerReg, '答案：');
              }
              //只有答案两个字的情况
              if (/^\s*\n?答案\s*\n?$/.test(val)) {
                val = val.replace(/^\s*\n?(答案)\s*/, '答案：');
              }

              if (val.match(singleReg)) {

                var m = val.match(singleReg);//匹配答案项
                var isAnswer = m[0].replace(/^\n?\s*(答案[:|：])\s*/, "");//寻找答案后的字符串
                //有答案字段，没有正确的答案
                if (!isAnswer) {
                  var newString = value.join(' ');
                  if (newString.match(/\n?\s*[a-h][.|、]\s*/ig)) {
                    //有选项情况下，默认为单选题
                    getClassify(value, detail, 1)
                  } else {
                    //填空题筛选
                    if ((newString.split('答案')[0]).match(fillReg)) {

                      getClassify(value, detail, 4);
                      return false
                    }
                    //无选项情况下，默认为问答题（主要包括判断题与问答题的区分）
                    getClassify(value, detail, 5)
                  }
                } else {
                  //word版多选题带,号处理
                  if (isAnswer.match(/^([a-h][,|，]){0,7}([a-h])$/ig)) {
                    isAnswer = isAnswer.replace(/,|，/g, '')
                  }
                  var isSelect = isAnswer.match(/^\s*[a-h]{1,8}\s*(?:\n|$)/i);//单选/多选
                  var isJude = isAnswer.match(/^\s*(正确|错误|对|错)\s*(?:\n|$)/i);//判断
                  var isSelects = [] //该数组用于接收处理玩空字符串之后的isSelect
                  // 针对大小写选项重复
                  if (isSelect) {
                    //  数组去重
                    isSelect = (isSelect[0].split('')).filter(function (ele, i, array) {
                      return array.indexOf(ele) === i;
                    });
                    //二次处理isSelect,去除空字符串
                    isSelect.forEach(function (value1) {
                      if ($.trim(value1)) {
                        isSelects.push(value1)

                      }
                    });
                    //排序
                    isSelects.sort();

                    //1，2项比较是否为同一个选项(a,A)
                    if (isSelects.length === 2 && isSelects[0].toLocaleLowerCase() === isSelects[1]) {
                      isSelects = isSelects.splice(0, 1)
                    }
                  }
                  //单选题
                  if (isSelects && isSelects.length === 1) {

                    getClassify(value, detail, 1)
                  }
                  //多选题
                  if (isSelects && isSelects.length > 1) {

                    getClassify(value, detail, 2)

                  }
                  //判断题
                  if (isJude) {

                    getClassify(value, detail, 3)

                  }
                  if (!isSelect && !isJude) {
                    // 填空题
                    if ((((value.join(" ").split('答案:'))[0].match(fillReg)) && (value.join(" ").split('答案:')).length > 1)
                      ||
                      (((value.join(" ").split('答案：'))[0].match(fillReg))) && (value.join(" ").split('答案：')).length > 1) {
                      getClassify(value, detail, 4)
                    } else {
                      //问答题
                      getClassify(value, detail, 5)
                    }
                  }
                }
              }
            })
          }
        });
        var html = '';
        //没有数据时隐藏检查处错误提示
        if (detail.length === 0) {
          $("#errorCount").text('');
          $("#errorText").hide();
          $("#nextError").hide()
        }
        var ii = -1;//计数
        detail.forEach(function (value) {
          ii++;

          qt_type = value.type;
          html = markdown.toHTML((value.name).join(''));

          $('div#preview').append(html);

          // 标记答案
          markAnswer(qt_type, ii);
          changeSize(ii);
          //  错误点及时检测
          var errorNum = $('.check_error').size();
          if (errorNum > 0) {

            $("#errorCount").text(errorNum);
            $("#errorText").show();
            if (errorNum === 1) {
              $("#nextError").text('查看').show();
            } else {
              $("#nextError").text('下一处').show();
            }
          } else {
            $("#errorCount").text('');
            $("#errorText").hide();
            $("#nextError").hide()
          }
        });

        //禁止右侧多选点击，禁止默认事件
        $(".key input").click(function () {
          return false
        })
        $(".body-content .cont-r .tab-content .batch-type .simulationOption div.now_diff").click(); //纠正难度错误
      }, 1500)
    }).on('froalaEditor.image.beforeUpload', function (e, editor, images) {
      // Return false if you want to stop the image upload.
//                if(images[0].size>2*1024*1024){
//                    alert("图片过大，无法上传");
//                    return false;
//                }
    }).on('froalaEditor.image.uploaded', function (e, editor, response) {
      //如果上传失败
      if (response.bizContent) {
        alert(response.bizContent.desc);
      }
    }).on('froalaEditor.image.error', function (e, editor, error, response) {
      // Image too text-large.
      if (error.code == 5) {
        alert("图片过大，无法上传");
      }
      // Invalid image type.s
      else if (error.code == 6) {
        alert("不支持该图片类型，请上传jpeg, jpg, png格式的图片");
      }
    }).on('froalaEditor.focus', function (e, editor) {
      //froala中有专门用于隐藏placeholder的方法--placeholder.hide()，但是尝试过不生效，因此用笨办法做隐藏显示
      if (editor.placeholder.isVisible()) {
        $(".fr-placeholder").hide();
      }
    }).on('froalaEditor.blur', function (e, editor) {
      if (editor.html.get() == "") {
        $(".fr-placeholder").show();
      }
    });
  }

  initFroala();
  // 行号
  $("#text-input").setTextareaCount({
    width: "0",
    bgColor: "#edf2f7",
    color: "#989A9C",
    display: "inline-block"
  });

  $("#excel").click(function () {
    var P = $(this).parent();
    P.removeClass().addClass("import_choose excel-checked");
    P.prev().removeClass().addClass("import_choose txt");
    P.next().removeClass().addClass("import_choose word");
  });

  // 标记答案
  function markAnswer(type, ii) {

    var list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    $(".question").eq(ii).each(function (index, element) {
      var $that = $(this);
      var titleNum = $(this).find('.type-box .title').text();
      var answerText = $(this).find(".qt_answer").text().replace(/^\s*答案\s*[:：]/, "");
      //word版多选题带,号处理
      if (answerText.match(/^([a-h][,|，]){0,7}([a-h])$/ig)) {
        answerText = answerText.replace(/,|，/g, '')
      }
      var answer = answerText.toUpperCase();
      //处理下只有图片的情况
      var checkTitle = $(this).find('.qt_title').text().replace($(this).find('.type-box').text(), '')

      if ($.trim(checkTitle) === '') {

        if ($(this).find('.qt_title img').size() < 1) {

          $(this).find('.qt_title').addClass('qt_error').html('题目（至少两个字)')

        }
      }
      //检测是否按顺序排序
      var select = $(this).find('.key .title').text();
      var type = $(this).data('type');
      select = select.split('.').join("");

      //处理题目中的题号带括号，替换下中文括号
      titleNum = titleNum.replace(/（/, '(');
      titleNum = titleNum.replace(/）/, ')');
      $(this).find('.type-box .title').text(titleNum);

      //错误标记check_error
      if ($(this).find('.error,.qt_error').size() > 0) {
        $(this).addClass("check_error")
      }

      if (type == "1" || type == "2") {

        for (var k = 0, selectLen = select.length; k < selectLen; k++) {

          //根据选项与ACSII的比较，判断是否为正常的排序及重复选项的存在
          if (!(select[k] === String.fromCharCode(65 + k))) {
            $(this).addClass("check_error");
            $(this).find('.key').addClass('qt_error')
          }
        }
        for (var i = 0, listLen = list.length; i < listLen; i++) {
          //标记选项框
          if (answer.search(list[i]) !== -1) {

            $(this).find(".key_" + list[i] + " .checkOrRadio").prop("checked", true);
          } else {
            $(this).find(".key_" + list[i] + " .checkOrRadio").attr("disabled", true);

          }
        }
        //根据选项最后一位的ASCII码 与选项对比小于即为不存选项（大写比较）
        //单选题判断答案是否存在
        // 过滤空字符串
        var answerhandle = answer.split('').filter(function (msg) {

          return msg && msg.trim()

        });
        //单选题判断答案是否存在
        if (answerhandle.length === 1) {
          if (select.slice(-1).charCodeAt() < answerhandle[0].toLocaleUpperCase().charCodeAt()) {
            $that.addClass("check_error");
            $that.find(".qt_answer").removeAttr('hidden').addClass('qt_error').text('答案不存在！')
          }
        }

        // 多选题判断答案是否存在
        if (answerhandle.length > 1) {

          for (var j = 0, answerLen = answerhandle.length; j < answerLen; j++) {
            if (answerhandle[j].charCodeAt() > select.slice(-1).charCodeAt()) {
              $that.addClass("check_error");
              $that.find(".qt_answer").removeAttr('hidden').addClass('qt_error').text('答案不存在！')
            }

          }
        }
        //题目有错误时把单多选按钮隐藏
        if ($(this).find(".qt_error").length != 0) {
          $(this).find('.change-type').hide()
        } else {
          $(this).find('.change-type').show()
        }

      }
      if (type == '4') {
        //  填空题括号与答案对应，先进行空元素匹配，在进行重复答案匹配
        var fillReg = /([\(|\（]\s*[\)|\）])/g;
        var newAnswer = [];
        if ($(this).find('.qt_title').text().match(fillReg)) {
          var fillNum = $(this).find('.qt_title').text().match(fillReg).length;
        }
        var answerNum = answerText.split('|');

        // 先判断长度是否相等
        if (fillNum !== answerNum.length) {
          $(this).addClass("check_error");
          //长度不相等即为错
          $(this).find(".qt_answer").addClass('qt_error')
        } else {
          //去除空元素
          answerNum.forEach(function (value) {
            if ($.trim(value)) {
              newAnswer.push(value)
            }
          });
          if (fillNum !== newAnswer.length) {
            $(this).addClass("check_error");
            //长度不相等即为错
            $(this).find(".qt_answer").addClass('qt_error')
          }
        }
      }
      if (type == '5') {
        //问答题答案为空时标记为错误
        if (answerText.length === 0) {
          $(this).addClass("check_error");
          $(this).find(".qt_answer").addClass('qt_error')
        }
      }
    });
    //单选多选相互转化
    $('.change-type input').click(function () {
      if ($(this).is(':checked')) {
        $(this).parent().siblings().removeClass('type-name-1').addClass('type-name-2');
        changeType($(this), '多选题', 'checkbox', 2);
      } else {
        $(this).parent().siblings().removeClass('type-name-2').addClass('type-name-1');
        changeType($(this), '单选题', 'radio', 1);
      }
    })
  }

  function changeType(tar, title, dataType, inputType) {
    tar.parent().siblings('.type-name').text(title);
    tar.parents('.qt_title').siblings('.key').find('input').attr('type', dataType);
    tar.parents('.question').attr('data-type', inputType)
  }

  //当题号过长时改变字号
  function changeSize(ii) {
    $(".question .qt_title .title").eq(ii).each(function (index, element) {
      var $numWords = $(this).text().length;
      if ($numWords == 4) {
        $(this).css({"font-size": "20px"});
      } else if ($numWords == 5) {
        $(this).css({"font-size": "16px"});
      } else if ($numWords > 5) {
        $(this).css({"font-size": "14px"});
      }
    });
  }

  // 试题类型以及难度选择
  $(".body-content .cont-r .tab-content .batch-type .simulationSelect").click(function (e) {
    e.stopPropagation();
    $(this).children(".simulationOption").show();
    $(this).siblings(".simulationSelect").children(".simulationOption").hide();
  });
  $('body').click(function () {
    $('.simulationOption').hide();
  });


  function getClassify(value, detail, num) {
    detail.push({
      name: value,
      type: num
    });
  }

