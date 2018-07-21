function writeCss(prefix,code,callback){
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(function (){
        n++
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scronllTop = domCode.scrollHeight //当页面不够高的时候，页面自动向上滚动
        if(n >= code.length){
            window.clearInterval(id)
            callback()
        }
    },10)
}

function writeMarkdown(markdown,callback){
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(function (){
        n++
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if(n >= markdown.length){
            window.clearInterval(id)
            callback()
        }
    },10)
}

function createPaper(callback){
    let paper = document.createElement('div')
    paper.id = 'paper'
    let content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    callback()
}

function markdownToHtml(callback){
    let markdownContainer = document.createElement('div')
    markdownContainer.className = 'markdownBody'
    markdownContainer.innerHTML = marked(markdown)
    let content = document.querySelector('#paper>.content')
    content.appendChild(markdownContainer)
    callback()
}
var code1 = `/* 
 * 面试官你好，我是陈辛达
 * 只用文字作自我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
*{
  transition: all 1s;
  margin: 0;
  padding: 0;
}
html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}
/* 我需要一点代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }
/* 加一个呼吸效果 */
#code{
  animation: breath 0.5s infinite alternate-reverse;
}
/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}
#paper > .content {
 display: block;
}
/* 于是我就可以在白纸上写字了，请看右边 */
`
let code2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`
let markdown = `
# 自我介绍
我叫陈辛达
1991年9月出生
武汉电力职业技术学院毕业
自学前端一年
希望应聘贵公司前端开发岗位
# 技能介绍
熟悉 JavaScript+CSS+html, jQuery, Ajax, Http, Webpack, Github等相关技能
# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板
# 联系方式
- QQ 410833544
- Email 410833544@qq.com
- 手机 18627841680
`

let code3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`
writeCss('', code1, ()=>{ // writeCss call the function
    createPaper(() => {
        writeMarkdown(markdown, ()=> {
            writeCss(code1, code2, ()=>{
                markdownToHtml(()=>{
                    writeCss(code1 + code2, code3, ()=> {
                        console.log('完成')
                    })
                })
            })
        })
    })
})