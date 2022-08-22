function SliderFunctions(container, slider, slides, btns, autoplay, time = 1000){
    this.container = container;
    this.slider = slider;
    this.slides = slides;
    this.btns = btns;
    this.time = time;
    this.items = 0;
    this.currentIndex = 0;
    this.moveCurrent = 0;
    this.counter = 0;
    this.countBtns = 0;

    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;
    let margin = 20;
    let startPos = 0;
    let exe = 0;
    let transitionEned = 0;
    let number1 = 0;
    let number2 = 0;
    let numberIndex = 0;
    let exeBool1 = false;
    let exeBool2 = false;

    this.btns.forEach((btnsItems, btnsIndex) => {
        btnsItems.addEventListener(`click`, () => {
            this.slider.style.transition = `.3s ease`;

            let slidesWidth = (this.slides[0].offsetWidth + margin)
            let numberDont = (9 - this.items) / 2;           

            let numberone = (this.slides.length - (exe + this.items) / 2) * -slidesWidth;         
            // let numberone = (this.slides.length - (9 + this.items) / 2) * -slidesWidth;            
            // let numbertwo = (this.slides.length - (11 + this.items) / 2) * -slidesWidth;

            let numberthree = ((exe - this.items) / 2) * -slidesWidth;
            // let numberthree = ((9 - this.items) / 2) * -slidesWidth;
            // let numberfour = ((11 - this.items) / 2) * -slidesWidth;

            if(this.slider.style.transform == `translateX(${numberone}px)`){
                    // if(btnsIndex == 0){
                    //     this.currentIndex = this.slides.length - (7 + this.items) / 2; 
                    // }else if(btnsIndex == 1){
                    //     this.currentIndex = this.slides.length - (5 + this.items) / 2;
                    // }
                    // else {
                    //     this.currentIndex = btnsIndex + numberDont;
                    // }
                exeBool1 = true;  
                number1 = 0;
                number2 = 1;
                numberIndex = 1;                            
            }else {
                exeBool1 = false;
                this.currentIndex = btnsIndex + numberDont;
            }

            if(this.slider.style.transform == `translateX(${numberthree}px)`){
                    // if(btnsIndex == (this.btns.length - 1)){
                    //     this.currentIndex = (7 - this.items) / 2;
                    //}else if(btnsIndex == (this.btns.length - 2)){
                    //     this.currentIndex = (5 - this.items) / 2;
                    // }else {
                    //     this.currentIndex = btnsIndex + numberDont;
                    // }
                exeBool2 = true; 
                number1 = this.btns.length - 2;
                number2 = this.btns.length - 1;
                numberIndex = 31;
            }else {
                exeBool2 = false;
                this.currentIndex = btnsIndex + numberDont;
            }

            if(exeBool1){
                if(btnsIndex == number1 || btnsIndex == number2){                    
                    this.currentIndex = this.slides.length - (((7 + this.items) / 2) - btnsIndex); 
                }else {
                    this.currentIndex = btnsIndex + numberDont;
                }
            }  

            if(exeBool2){
                if(btnsIndex == number1 || btnsIndex == number2){
                    this.currentIndex = btnsIndex - 11 + ((5 - this.items) / 2);
                }else {
                    this.currentIndex = btnsIndex + numberDont;
                }
            } 

            if(btnsIndex == this.btns.length - 1 || btnsIndex == 0){
                exe = 9;
            }else {
                exe = 11;
            }
           
            // if(this.slider.style.transform >= `translateX(${numberone}px)` || this.slider.style.transform == `translateX(${numbertwo}px)`){
            //     if(btnsIndex == 0){
            //         this.currentIndex = this.slides.length - (7 + this.items) / 2; 
            //     }else if(btnsIndex == 1){
            //         this.currentIndex = this.slides.length - (5 + this.items) / 2;
            //     }
            //     else {
            //         this.currentIndex = btnsIndex + numberDont;
            //     }                
            // }else if(this.slider.style.transform <= `translateX(${numberthree}px)` || this.slider.style.transform == `translateX(${numberfour}px)`){
            //     if(btnsIndex == (this.btns.length - 1)){
            //         this.currentIndex = (7 - this.items) / 2;
            //     }else if(btnsIndex == (this.btns.length - 2)){
            //         this.currentIndex = (5 - this.items) / 2;
            //     }else {
            //         this.currentIndex = btnsIndex + numberDont;
            //     }
            // }   
            // else {
            //     this.currentIndex = btnsIndex + numberDont;
            // }           

            this.buttons(btnsIndex);
        });  
    });

    this.buttons = (e) => {
        let slidesWidth = this.slides[0].offsetWidth + margin;
        currentTranslate = this.currentIndex * -slidesWidth;
        prevTranslate = currentTranslate;
        
        if(this.currentIndex - (9 - this.items) / 2 > this.slides.length - 9){
            if(e != undefined){
                this.counter = e;
            }else {
                this.counter = 0;
            }
        }else if(this.currentIndex - (9 - this.items) / 2 < 0 ){
            if(e != undefined){
                this.counter = e;
            }else {
                this.counter = this.slides.length - 9;
            }
        }
        else {
            this.counter = this.currentIndex - (9 - this.items) / 2;  
        }
        document.querySelector(`.btns.active`).classList.remove(`active`);
        this.btns[this.counter].classList.add(`active`);
        document.querySelector(`.slide.active`).classList.remove(`active`);
        this.slides[this.counter + 4].classList.add(`active`);
        
        this.slider.style.transform = `translateX(${currentTranslate}px)`;
    };



    // Touches events start

    getPositionX = (event) => {
        return event.type.includes(`mouse`) ? event.pageX : touches[0].clientX;
    }

    touchStart = (index) => {
        return function(event){
            slider.style.transition = `.3s ease`;
            isDragging = true;
            startPos = getPositionX(event);
        }
    }

    touchEnd = () => {
        isDragging = false;

        let moveBy = currentTranslate - prevTranslate;

        if(moveBy < -10){
            this.currentIndex++
        }
        if(moveBy > 10){
            this.currentIndex--;
        }
        
        this.buttons();
    }

    // Touches events end


    
    let responsive = [
        {breakpoint: {width: 0, item: 1}},
        {breakpoint: {width: 600, item: 2}},
        {breakpoint: {width: 800, item: 3}},
        {breakpoint: {width: 1000, item: 4}}
    ];

    sliderResize = (e) => {
        responsive.forEach(itm => {
            if(window.innerWidth > itm.breakpoint.width){
                this.items = itm.breakpoint.item;
            }
        });

        let slideWidth = Math.floor(e[0].contentRect.width);
        this.currentIndex = (9 - this.items) / 2;

        this.slides.forEach(element => {
            let elementWidth = Math.floor((slideWidth / this.items) - margin);
            
            element.style.width = `${elementWidth}px`;
            element.style.margin = `${margin / 2}px`;
            element.style.height = `200px`;

            this.slider.style.transform = `translateX(${this.currentIndex * -(elementWidth + margin)}px)`;
        });

        this.touchEnd();
    }

    this.resize = new ResizeObserver(sliderResize);
    this.resize.observe(this.container);

    touchMove = (event) => {
        if(isDragging){
            let move = getPositionX(event);

            currentTranslate = prevTranslate + move - startPos;
            slider.style.transform = `translateX(${currentTranslate}px)`;
        }
    }

    this.slides.forEach((slide, index) => {
        // Touch event
        slide.addEventListener(`touchstart`, touchStart(index));
        slide.addEventListener(`touchend`, touchEnd);
        slide.addEventListener(`touchmove`, touchMove);

        // mouse event
        slide.addEventListener(`mousedown`, touchStart(index));
        slide.addEventListener(`mouseup`, touchEnd);
        slide.addEventListener(`mouseleave`, touchEnd);
        slide.addEventListener(`mousemove`, touchMove);
    })

    this.slider.addEventListener(`transitionend`, () => {
        if(this.currentIndex == this.slides.length - (5 + this.items) / 2 || this.currentIndex == this.slides.length - (7 + this.items) / 2){
            this.currentIndex == this.slides.length - (7 + this.items) / 2 ? transitionEned = 9 : transitionEned = 11;
            let slidesWidth = this.slides[0].offsetWidth + margin;
            this.slider.style.transition = `none`;
            this.currentIndex = (transitionEned - this.items) / 2;
            this.slider.style.transform = `translateX(${this.currentIndex * -slidesWidth}px)`;
            exeBool1 = false;
        }
        if(this.currentIndex == (5 - this.items) / 2 || this.currentIndex == (7 - this.items) / 2){
            this.currentIndex == (7 - this.items) / 2 ? transitionEned = 9 : transitionEned = 11;
            let slidesWidth = this.slides[0].offsetWidth + margin;
            this.slider.style.transition = `none`;
            this.currentIndex = this.slides.length - (transitionEned + this.items) / 2;
            this.slider.style.transform = `translateX(${this.currentIndex * -slidesWidth}px)`;
            exeBool1 = false;
        }
    })
}