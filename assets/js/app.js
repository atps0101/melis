document.addEventListener('DOMContentLoaded', function () {

    const body = document.body;
    const melisHamb = document.getElementById('melis_hamb');
    const close = document.getElementById('close');
    const melisNavHeader = document.querySelector('.melis_nav-body');
    const overlay = document.querySelector('.overlay');
    const navigationItems = document.querySelectorAll('.map_nav-item');
    const markerItems = document.querySelectorAll('.marker');
    const faqItems = document.querySelectorAll('.faq_list li');
    const observeElements = document.querySelectorAll('.observe');

    melisHamb.addEventListener('click', function () {
        melisNavHeader.classList.add('open');
        body.classList.add('_overlay');
    });

    close.addEventListener('click', function () {
        melisNavHeader.classList.remove('open');
        body.classList.remove('_overlay');
    });


    overlay.addEventListener('click', function () {
        var elementsWithOpenClass = document.querySelectorAll('.open');
        elementsWithOpenClass.forEach(function (element) {
            element.classList.remove('open');
        });
        document.body.classList.remove('_overlay');
    });


    function handleHoverEnter(event) {
        const dataId = event.currentTarget.getAttribute('data-id');

        navigationItems.forEach(item => {
            if (item.getAttribute('data-id') === dataId) {
                item.classList.add('active');
            }
        });

        markerItems.forEach(item => {
            if (item.getAttribute('data-id') === dataId) {
                item.classList.add('active');
            }
        });
    }

    function handleHoverLeave() {
        navigationItems.forEach(item => item.classList.remove('active'));
        markerItems.forEach(item => item.classList.remove('active'));
    }

    navigationItems.forEach(item => {
        item.addEventListener('mouseenter', handleHoverEnter);
        item.addEventListener('mouseleave', handleHoverLeave);
    });

    markerItems.forEach(item => {
        item.addEventListener('mouseenter', handleHoverEnter);
        item.addEventListener('mouseleave', handleHoverLeave);
    });



    faqItems.forEach((item) => {
    item.addEventListener('click', () => {
        const question = item.querySelector('.question');
        question.classList.toggle('open');
    });
    });
  

    document.querySelectorAll(".anchor").forEach(function(anchor) {
        anchor.addEventListener("click", function(event) {
        event.preventDefault();
    
        if (this.hash !== "") {
            var hash = this.hash;
            setTimeout(function () {
            var target = document.querySelector(hash);
            if (target) {
                window.scrollTo({
                top: target.offsetTop - 150,
                behavior: "smooth"
                });

                document.querySelectorAll('.open').forEach(function(element) {
                    element.classList.remove('open');
                });
                
                document.body.classList.remove('_overlay');

            }
            }, 100);
        }
        });
    });
  

    observeElements.forEach(observe => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            observe.classList.add('animation');
            observer.disconnect();
        }
    });
    });

    observer.observe(observe);
    });



    document.addEventListener('click', function(event) {
        const target = event.target;
        const popup = document.querySelector('.popup_form');
    
        if (target.closest('.btn')) {
            popup.classList.add('open');
            document.body.classList.add('_overlay');
        }
    });
    


    document.querySelectorAll("form").forEach(function(form) {
        form.addEventListener("submit", function(event) {
        event.preventDefault();
    
        const formBlock = form;
        const formData = new FormData(formBlock);
        const utmData = getUtmLabels();
    
        formData.append('utm_source', utmData.utm_source);
        formData.append('utm_medium', utmData.utm_medium);
        formData.append('utm_campaign', utmData.utm_campaign);
        formData.append('gclid', utmData.gclid);

        const url = "handler.php";

        fetch(url, {
            method: "POST",
            body: formData
        })
        .then(function(response) {
            if (response.ok) {
                return response.json(); 
            } else {
                return response.json(); 
            }
        })
        .then(function(data) {

            formBlock.classList.remove("error")
            formBlock.querySelectorAll('input').forEach(function (field) {
                field.classList.remove('error');
            });
            
            if (data.status !== 'error') {
                
                document.querySelector(".success").classList.add("open");
                        
                    setTimeout(function() {
                        formBlock.querySelector(".success").classList.remove("open");
                    form.reset();
                        
                    document.querySelectorAll(".popup_form").forEach(function(popupForm) {
                        popupForm.classList.remove("open");
                    });
                            
                    document.body.classList.remove("_overlay");
                }, 5000);
                        
                fbq("track", "Lead");

            } else {

                if (data.input) {
                    const errorField = document.getElementById(data.input);
                     if (errorField) {
                        errorField.classList.add("error");
                     }
               }  
            }
        })
        .catch(function(error) {
            console.error("Fetch Error: ", error);
        });

        });
    });
  


    function getUtmLabels() {
        const currentUrl = window.location.href;
        const urlParams = new URLSearchParams(new URL(currentUrl).search);

        const utmSource = urlParams.has('utm_sourse') ? urlParams.get('utm_sourse') : null;
        const utmMedium = urlParams.has('utm_medium') ? urlParams.get('utm_medium') : null;
        const utmCampaign = urlParams.has('utm_campaign') ? urlParams.get('utm_campaign') : null;
        const gclid = urlParams.has('gclid') ? urlParams.get('gclid') : null;

        return {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            gclid: gclid
        };
    }


      const presentation_slider = new Swiper('.presentation-slider', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1, 
        spaceBetween: 50,
        navigation: {
            nextEl: '.presentation_arrow_next',
            prevEl: '.presentation_arrow_prev',
        },
        keyboard: {
            enabled: true,
        },
        mousewheel: {
            enabled: true,
        },
        
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 60,
            },
            1440: {
                slidesPerView: 2,
                spaceBetween: 50,
            },
            1920: {
                slidesPerView: 2,
                spaceBetween: 50,
            }
        }
    });
    
    const demo_slider = new Swiper('.demo-slider', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        slidesOffsetBefore: 0,
        loopedSlides: 3,
        grabCursor: true,
        loop: true,
        keyboard: {
            enabled: true,
        },
        mousewheel: {
            enabled: true,
        },
        navigation: {
            nextEl: '.demo-slide-next',
            prevEl: '.demo-slide-prev',
        }
      });

      function handleScroll() {
        if (window.scrollY > 0) {
        body.classList.toggle('scroll', true);
        } else {
        body.classList.toggle('scroll', false);
        }
    }


    window.addEventListener('scroll', handleScroll);
  
    });

    import(/* webpackChunkName: "inputmask" */ 'inputmask').then(inputmask => {

            const phoneInput = document.getElementById('phone');

            let im = new Inputmask("+380");

            im.mask(phoneInput);

            Inputmask({"mask": "+38 (099)-999-99-99"}).mask(phoneInput)
    });



