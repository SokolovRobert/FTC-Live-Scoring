class Stopwatch {
    constructor(display) {
        this.fiveMin = false;
        this.endGame = false;
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
        //this.audioStart = new Audio('assets/sounds/start.mp3');
        //this.audioEnd = new Audio('assets/sounds/FogHorn.mp3');
        //this.audioEndGame = new Audio('assets/sounds/OutOfTime.mp3');

        this.startAuto =  new Audio('assets/sounds/start-auto.wav');
        this.startTele =  new Audio('assets/sounds/start-tele.wav');
        this.endAuto =  new Audio('assets/sounds/end-auto.wav');
        this.endTele =  new Audio('assets/sounds/end-tele.wav');
        this.fogHorn =  new Audio('assets/sounds/stop-forghorn.wav');
        this.audioEndGame =  new Audio('assets/sounds/time-endgame.wav');
    }
    
    reset() {
        this.times = [ 2, 30, 0];
        this.fiveMin = false;
        this.print();
    }

    resetNoAuto(){
        this.times = [ 2, 0, 0];
        this.fiveMin = false;
        this.print();
    }

    resetFiveMinTime(){
        this.times = [ 5, 0, 0];
        this.fiveMin = true;
        this.print();
    }
    
    start() {
        if (this.times[0] == 2 && this.times[1] == 0){
            //Start Teleop
            this.startTele.play();
            
            a_or_t = 't';
            var $jsValue = document.getElementById("topImg");
            $jsValue.src = "assets/pics/tele.png";               
            
            this.endGame = false;
            this.times = [1, 59, 99];
            this.time = performance.now();
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }else if(this.times[0] == 2 && this.times[1] == 30){
            //Start auto
            this.startAuto.play();

            a_or_t = 'a';
            var $jsValue = document.getElementById("topImg");
            $jsValue.src = "assets/pics/auto.png";               
            
            this.endGame = false;
            this.time = performance.now();
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }else if(this.fiveMin){
            //Start 5 Min Timer
            this.endGame = false;
            this.time = performance.now();
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    
    stop() {
        this.running = false;
        this.endGame = false;
        this.fiveMin = false;
        this.time = null;
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }
    
    step(timestamp) {
        if (!this.running) return;
        if (this.times[0]<=0){
            //check if match is ending
            if (this.times[0]<0){
                this.times = [ 0, 0, 0];
                this.print();
                this.endTele.play();
                stop();
                return;
            }
            if (this.times[1]<=0){
                if(this.times[2]<=3){
                    this.times = [ 0, 0, 0];
                    this.print();
                    this.endTele.play();
                    stop();                
                    return;
                }
            }
        }
        if (this.times[0]==1 && !this.fiveMin){
            //check if auto is ending 
            //end auto
            if (this.times[1]==60){
                this.times = [ 2, 0, 0];
                this.print();
                this.endAuto.play();
                stop();
                return;
            }
        }

        if (!this.endGame){
            //check for endgame
            if (this.times[0]==0){
                //tele ending
                if(this.times[1]==30){
                    this.endGame = true;  
                    this.audioEndGame.play();  
                }
            }
            if (this.times[0]==2 && !this.fiveMin){
                //auto ending
                if(this.times[1]==19){
                    this.endGame = true;  
                    this.audioEndGame.play();  
                }
            }
            
        }
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    
    calculate(timestamp) {
        var diff = timestamp - this.time;

        this.times[2] -= diff / 10;
        if (this.times[2] <= 0) {
            this.times[1] -= 1;
            this.times[2] += 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] <= 0) {
            this.times[0] -= 1;
            this.times[1] += 60;
        }
    }
    
    print() {
        this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `\
        ${pad0(times[0], 2)}:\
        ${pad0(times[1], 2)}:\
        ${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
