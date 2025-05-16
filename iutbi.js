document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('header');
    const img = document.createElement('img');
    img.src = 'valorant-logo.PNG'; 
    img.alt = 'Valorant Logo';
    img.id = 'logo';
    header.insertBefore(img, header.firstChild);


    const paragraphs = document.querySelectorAll('article p');
    const paragraphObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    paragraphs.forEach(paragraph => {
        paragraphObserver.observe(paragraph);
    });


    const videos = document.querySelectorAll('.scroll-video');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                
                if (!video.src) {
                    video.src = video.getAttribute('data-src');
                }
                video.classList.add('visible');
                video.play().catch(e => console.log("Autoplay prevented:", e));
            } else {
                video.pause();
                video.currentTime = 0; 
            }
        });
    }, { threshold: 0.7 });

    videos.forEach(video => {

        video.loop = true;
        videoObserver.observe(video);
        
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
    });
});


const featuredVideo = document.querySelector('.featured-video-element');
if (featuredVideo) {

    featuredVideo.muted = false;
    const playPromise = featuredVideo.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
           
            featuredVideo.muted = true;
            featuredVideo.play();
            
        
            featuredVideo.addEventListener('click', () => {
                featuredVideo.muted = !featuredVideo.muted;
                if (featuredVideo.muted) {
                    featuredVideo.classList.remove('unmuted');
                } else {
                    featuredVideo.classList.add('unmuted');
                }
            });
            
         
            const unmuteButton = document.createElement('div');
            unmuteButton.className = 'unmute-button';
            unmuteButton.innerHTML = '🔇 Click to Unmute';
            unmuteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                featuredVideo.muted = false;
                featuredVideo.classList.add('unmuted');
                unmuteButton.remove();
            });
            featuredVideo.parentNode.appendChild(unmuteButton);
        });
    }
    
    
    featuredVideo.loop = true;
}

function revealRank(element) {
    element.classList.toggle('revealed');
    
    const label = element.parentElement.querySelector('.server-label');
    if (element.classList.contains('revealed')) {
        label.style.animation = 'fadeInUp 0.5s ease-out forwards';
    } else {
        label.style.animation = '';
    }}
