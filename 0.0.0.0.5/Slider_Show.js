class Slider_Show{
    SlideIndex = 1;

    constructor(option){
        this.option = option;
        this.intialStuff();

        this.createNextAndPrevBtns();
        this.createDots();

        this.ShowSlides(1);
        this.setInterval();
    };
    // /////////////////////////////////////////////////////////////
    intialStuff(){
        let { Element , Slider , Timer } = this.option;

        if(! Slider) throw Error('slider element is not exists');

        Number.isInteger(Timer) ? this.Timer = Timer : this.Timer = 0 ;

        this.Sliders = [...Element.querySelectorAll('.SSContent')];
    };
    createNextAndPrevBtns(){
        let {Element} = this.option;

        Element.insertAdjacentHTML('beforeend',`
        <a class="next">&#10095;</a>
        <a class="prev">&#10094;</a>
        `);

        Element.querySelector('.next').addEventListener('click' , () => this.nextAndPrevSlide(this.SlideIndex += 1))
        Element.querySelector('.prev').addEventListener('click' , () => this.nextAndPrevSlide(this.SlideIndex -= 1))
    };
    nextAndPrevSlide(n){
        this.ResetInterval();
        this.ShowSlides(n);
    };
    CurrentSlider = n => {
        this.ResetInterval();
        this.ShowSlides(this.SlideIndex = n) 
    };
    createDots(){
        let{ Element } = this.option;

        let DotElements = [...this.Sliders].map((Slider_Show , index) => `<span class="dot" data-slide="${index+1}"></span>`)

        let Dots = document.createElement('div')
        Dots.classList.add('dots');
        Dots.innerHTML = `${DotElements.join('')}`

        Element.after(Dots);

        this.Dots = Dots.querySelectorAll('.dot');
        this.Dots.forEach(dot => Dots.addEventListener('click' , e => {this.CurrentSlider(parseInt(e.target.dataset.slide))}));
    };

    ShowSlides(Num){
        let{ Element , Slider , CurrentSlider } = this.option;

        if (Num > this.Sliders.length) {this.SlideIndex = 1};
        if (Num < 1) {this.SlideIndex = this.Sliders.length};

        Element.querySelector(`.${Slider}.Active`).classList.remove('Active');
        this.Dots.forEach(dot => dot.classList.remove('Active'));
        this.Sliders[this.SlideIndex-1].classList.add('Active');
        this.Dots[this.SlideIndex-1].classList.add('Active');

        if(CurrentSlider) CurrentSlider(this.Sliders[this.SlideIndex-1]);
    };
    setInterval() {
        if(this.Timer != 0) {this.intervalID = setInterval(() => this.ShowSlides(this.SlideIndex += 1) , this.Timer);}
    };
    ResetInterval() {
        clearInterval(this.intervalID);
        this.setInterval();
    };
};