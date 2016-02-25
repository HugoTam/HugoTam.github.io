/**
 * Created by hugotam on 16/2/24.
 */

var ShowConArea = React.createClass({

    getInitialState: function() {
        return {
            active: false
        }

    },

    componentDidMount: function(){
        this.handleActiveEvent();
    },


    //接受到新的props或者setdate完成渲染DOM时...
    componentDidUpdate: function(){
        this.handleActiveEvent();
    },

    handleActiveEvent: function(){
        var _this = this;

        if(_this.props.event == "HUT"){
            var $key = $(".event-HUT .key");

            $key.each(function(i){

                var $this = $(this);

                var delayTime = i+1;

                var delayUnit = 50;



                setTimeout(function(){
                    $this.addClass("show");
                },delayTime*delayUnit);

            });
        }
    },

    handleCancelKeyActive: function(){
        console.log("cancel success");
    },

    render: function(){
        var _this = this;

        switch(_this.props.event){
            case "HUT":
                var con = <div className="key-wrapper">
                    <div className="keys" onMouseLeave={this.handleCancelKeyActive}>
                        <a href="#" className="key t1">湖南工业大学</a>
                        <a href="#" className="key t2">包装工程</a>
                        <a href="#" className="key t3">皇牌专业</a>
                        <a href="#" className="key t4">盒子</a>
                        <a href="#" className="key t5">工厂</a>
                        <a href="#" className="key t6">
                            <span className="words">流水线</span>
                            <span className="word w1">流</span><span className="word w2">水</span><span className="word w3">线</span>
                        </a>
                        <a href="#" className="key t7">迷茫</a>
                        <a href="#" className="key t8">孤独</a>
                        <a href="#" className="key t9">WOW</a>
                        <a href="#" className="key t10">LOL</a>
                        <a href="#" className="key t11">大学生</a>
                        <a href="#" className="key t12">考研</a>
                        <a href="#" className="key t13">恐惧</a>
                    </div>
                </div>

                break;
            default :

                break;


        }

        return(
            <div className={"show-con-wrapper event-"+_this.props.event}>{con}</div>

        )
    }

});