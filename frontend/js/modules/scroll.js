const scrollFunc = () =>{
    // eslint-disable-next-line no-global-assign
    scrollTo = (element) => {
        window.scroll({
          behavior: 'smooth',
          left: 0,
          top: element.offsetTop
        });
    }
    
    let queryHeader = document.querySelector('header');
    let queryMain = document.querySelector('main');
    let queryFooter = document.querySelector('footer');
    
    document.getElementById("anchorHeader").addEventListener('click', (e) => {
        e.preventDefault();
        scrollTo(queryHeader);
    });
    
    document.getElementById("anchorFooter").addEventListener('click', (e) => {
        e.preventDefault();
        scrollTo(queryFooter);
    });
      
    document.getElementById("anchorMain").addEventListener('click', (e) => {
        e.preventDefault();
        scrollTo(queryMain);
    });
}

export { scrollFunc };