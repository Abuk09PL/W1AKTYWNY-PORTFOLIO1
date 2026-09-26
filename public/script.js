document.addEventListener('DOMContentLoaded',()=>{
 const favicon=document.createElement('link');
 favicon.rel='icon';
 favicon.type='image/svg+xml';
 favicon.href=location.pathname.includes('/galleries/')?'../logo.svg':'logo.svg';
 document.head.appendChild(favicon);
 const menu=document.querySelector('.menu'),links=document.querySelector('.nav-links');
 if(menu) menu.addEventListener('click',()=>links.classList.toggle('open'));
 const hero=document.querySelector('.hero');
 if(hero && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    let targetX=0,targetY=0,currentX=0,currentY=0,animationFrame;
    const followCursor=()=>{
     currentX+=(targetX-currentX)*.12;
     currentY+=(targetY-currentY)*.12;
     hero.style.setProperty('--mouse-x',`${currentX}px`);
     hero.style.setProperty('--mouse-y',`${currentY}px`);
     animationFrame=requestAnimationFrame(followCursor);
    };
  hero.addEventListener('pointermove',event=>{
   const bounds=hero.getBoundingClientRect();
     targetX=event.clientX-bounds.left;
     targetY=event.clientY-bounds.top;
   hero.classList.add('cursor-active');
     if(!animationFrame) animationFrame=requestAnimationFrame(followCursor);
  });
    hero.addEventListener('pointerleave',()=>{
     hero.classList.remove('cursor-active');
     cancelAnimationFrame(animationFrame);
     animationFrame=undefined;
    });
 }
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});
 document.querySelectorAll('.fade').forEach(el=>observer.observe(el));
 const lb=document.querySelector('.lightbox');
 if(lb){const image=lb.querySelector('img'),items=[...document.querySelectorAll('.gallery-item img')];let index=0;
  const show=i=>{index=(i+items.length)%items.length;image.src=items[index].src;image.alt=items[index].alt};
  items.forEach((im,i)=>im.parentElement.addEventListener('click',()=>{show(i);lb.classList.add('open')}));
  lb.querySelector('.lb-close').onclick=()=>lb.classList.remove('open');lb.querySelector('.lb-prev').onclick=()=>show(index-1);lb.querySelector('.lb-next').onclick=()=>show(index+1);
  document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')lb.classList.remove('open');if(e.key==='ArrowLeft')show(index-1);if(e.key==='ArrowRight')show(index+1)});
  lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open')});
 }
});
