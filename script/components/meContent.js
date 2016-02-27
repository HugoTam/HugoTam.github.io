/**
 * Created by hugotam on 16/2/20.
 */
//博客内容容器
var MeContent = React.createClass({

    render: function(){
        var myTags = this.props.updateMyTags.map(function(myTags,i){
            return(
                <span key={i} className="tag">{"#"+myTags+" ."}</span>
            );
        });


        return <div className="me-wrapper">
            <div className="intro-wrapper">
                {/*个人信息*/}
                <div className="info">
                    <div className="avatar"></div>
                    <p>Hugo Tam, 对此人收集的情报还十分有限。</p>
                    <span>(谭什么)</span>
                </div>
                {/*经历*/}
                <div className="simple-exp">
                    <p><span className="exp-time">2012.09 -- present.</span>湖南工业大学 本科 数字媒体艺术</p>
                    <p><span className="exp-time">2013.07 -- present.</span>湖南工业大学 <a href="http:idhut.cn">创新设计实验室</a></p>
                    <p><span className="exp-time">2014.?? -- 2016.02</span><a href="http://quickwis.com/">长沙快智OK记</a> 产品/设计/前端打杂</p>
                </div>
                {/*标签*/}
                <div className="tags">{myTags}</div>
                {/*分割线*/}
                <div className="di-line"></div>
            </div>
            <div className="contact-wrapper">
                <h1 className="title">联系</h1>
                <div className="contact-list">
                    <div className="email">邮箱：<a href="#">hugotammmm@gmail.com</a></div>
                    <div className="weibo">微博：<a href="http://weibo.com/cupxxx">谭什么鬼</a></div>
                    <div className="wechat">微信：
                        <div className="wechat-info">
                            <img src="images/myQRcode.png" alt="QRCode"/>
                            <span className="tips">(加好友请注明来意)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

});