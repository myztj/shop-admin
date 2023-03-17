<template>
  <div class="app-container">

    <editor id="tinymce" v-model="tinymceHtml" :init="init"></editor>
    <div v-html="tinymceHtml"></div>
  </div>
</template>
<script setup>
  import { reactive, watch, ref, onMounted } from 'vue';
  import tinymce from "tinymce/tinymce";
  import "tinymce/models/dom"; // 特别注意 tinymce 6.0.0 版本之后必须引入，否则不显示
  import "tinymce/themes/silver/theme";
  import Editor from "@tinymce/tinymce-vue"; // 引入组件
  // 都是富文本插件
  import "tinymce/icons/default";
  import 'tinymce/plugins/advlist'; //高级列表
  import 'tinymce/plugins/emoticons'; //表情
  import "tinymce/plugins/image";
  import "tinymce/plugins/link";
  import "tinymce/plugins/code";
  import "tinymce/plugins/table";
  import 'tinymce/plugins/lists'; //列表插件
  import "tinymce/plugins/wordcount";
  // 以上所有的样式在 node_modules 下面 tinymce 里面的 plugins 都能找到。
  const props = defineProps({
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default:
        'print preview searchreplace autolink directionality emoticons visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave ',
    },
    toolbar: {
      type: [String, Array],
      default:
        'fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
              styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
              table image media charmap emoticons hr pagebreak insertdatetime print preview | code selectall | indent2em lineheight formatpainter axupimgs',
    },
  });
  const state = reactive({
    contentValue: props.value,
  });
  const initOptions = ref({
    emoticons_database_url: '/tinymce/emoticons/js/emojis.js', //更改表情插件路径
    language_url: '/tinymce/langs/zh_CN.js', //引入语言包文件
    language: 'zh_CN', //语言类型

    skin_url: '/tinymce/skins/ui/oxide', //皮肤：浅色
    // skin_url: '/tinymce/skins/ui/oxide-dark',//皮肤：暗色

    plugins: props.plugins, //插件配置
    toolbar: props.toolbar, //工具栏配置，设为false则隐藏
    // menubar: 'file edit',  //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”

    fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
    font_formats:
      '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',

    height: 600, //注：引入autoresize插件时，此属性失效
    placeholder: '在这里输入文字...',
    branding: false, //tiny技术支持信息是否显示
    resize: false, //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
    // statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
    elementpath: false, //元素路径是否显示

    //content_style: 'img {max-width:100%;}', //直接自定义可编辑区域的css样式
    content_css: '/tinymce/tinycontent.css', //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入

    // images_upload_url: '/demo/upimg.php',  //后端处理程序的url
    // images_upload_base_path: '/demo',  //相对基本路径--关于图片上传建议查看--http://tinymce.ax-z.cn/general/upload-images.php
    // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
    // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
    images_upload_handler: (blobInfo, success) => {
      const img = 'data:image/jpeg;base64,' + blobInfo.base64();
      success(img);
    },
  });
  const emits = defineEmits(['input', 'onClick']);
  const onClick = (e) => {
    emits('onClick', e, tinymce);
  };

  onMounted(() => {
    tinymce.init({});
  });
  watch(
    () => props.value,
    (newValue) => {
      state.contentValue = newValue;
    }
  );
  watch(
    () => state.contentValue,
    (newValue) => {
      emits('input', newValue);
    }
  );
  const tinymceHtml = ref("请输入内容");
  const init = {
    //初始化数据
    language_url: "/langs/zh-Hans.js", // 引入语言包（该语言包在public下，注意文件名称）
    language: "zh-Hans", // 这里名称根据 zh-Hans.js 里面写的名称而定
    skin_url: "/skins/ui/oxide", // 这里引入的样式
    height: 300, // 限制高度
    plugins: "link lists image code table wordcount", // 富文本插件
    toolbar:
      "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
    branding: false, // //是否禁用“Powered by TinyMCE”
    menubar: true, //顶部菜单栏显示
    // paste_convert_word_fake_lists: false, // 插入word文档需要该属性
    content_css: "/skins/content/default/content.css", //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
    images_upload_handler: (blobInfo) =>
      new Promise((resolve, reject) => {
        // console.log(blobInfo.blob());
        // 上传图片需要，FormData 格式的文件；
        const formDataUp = new FormData();
        // img  是接口需要的上传的属性名，一般属性名是 file
        formDataUp.append("img", blobInfo.blob());
        // // console.log(formDataUp);
        axios.post("xxxx", formDataUp).then((res) => {
          resolve("返回的上传图片后的地址");
        });
      }),
  };
  onMounted(() => {
    tinymce.init({}); // 初始化富文本
  });
</script>