var app = new Vue({
    el: "#app",
    data: {
        input: "",
        total: ""
    },
    computed: {
        
    },
    methods: {
        buttonClick: function(event){
            let domValue = event.target.value;
            if(this.input == "" && (domValue == "*" || domValue == "+" || domValue == "/")){
                return;
            }
            if(this.input != ""){
                if(isNaN(this.input.slice(-1)) && isNaN(domValue)){
                    //最後が演算子かつ入力が演算子だった場合
                    let arg = this.input;
                    this.input = arg.slice(0, -1) + domValue;
                } else if(!isNaN(this.input.slice(-1)) && !isNaN(domValue)){
                    //最後が数字かつ入力も数字だった場合
                    this.input += domValue;
                } else{
                    //最後が数字で入力が演算子のパターンか最後が演算子で入力が数字のパターン
                    this.input += " " + domValue;
                }

            } else{
                //最初の入力（-か数値のみ受け入れ）
                this.input += domValue;
            }
        },
        calculate: function(){
            if(this.input != ""){
                let temp = calculateString(this.input);
                this.total = temp;
                this.input = "";
            }
        }  
    }
    
})

function calculateString(expression){
    return Function('"use strict";return ('+expression+')')();
}

