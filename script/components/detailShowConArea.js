/**
 * Created by hugotam on 16/2/24.
 */

var ShowConArea = React.createClass({

    getInitialState: function() {
        return {
            event: []
        }

    },

    render: function(){
        var _this = this;

        switch(_this.props.event){
            case "HUT":
                var con = <div>
                    <div></div>
                </div>;

                break;
            default :
                var con = <div>{_this.props.event}</div>

                break;


        }

        return(
            <div className="show-con-wrapper">{con}</div>

        )
    }

});