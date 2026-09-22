document.addEventListener('DOMContentLoaded',()=>{
 const favicon=document.createElement('link');
 favicon.rel='icon';
 favicon.type='image/svg+xml';
 favicon.href=location.pathname.includes('/galleries/')?'../logo.svg':'logo.svg';
 document.head.appendChild(favicon);
 const menu=document.querySelector('.menu'),links=document.querySelector('.nav-links');
 if(menu) menu.addEventListener('click',()=>links.classList.toggle('open'));
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
