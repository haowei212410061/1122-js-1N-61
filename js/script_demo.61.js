function showdemo(week) {
    const p = document.querySelector('.show-classdemo');
    console.log('p', p);
    switch (week) {
        case "w1":
            p.innerHTML = `<iframe src="./demo/w01_61/index.html" width="100%" height="100%" />`;
            break;
        case 'w2':
            p.innerHTML = `<iframe src="./demo/w02_tictactoe.61/tictactoe.html" width="100%" height="100%" />`;
            break;
        case 'w3-p1':
            p.innerHTML = `<iframe src="./demo/w03_basics_61/p1_61/p1_61.html" width="100%" height="100%" />`;
            break;
        case 'w3-p2':
            p.innerHTML = `<iframe src="./demo/w03_basics_61/p2_61/p2_61.html" width="100%" height="100%" />`;
            break;
        case 'w3-p3':
            p.innerHTML = `<iframe src="./demo/w03_basics_61/p3_61/p3_61.html" width="100%" height="100%" />`;
            break;
        case 'w4-p4':
            p.innerHTML = `<iframe src="./demo/w04_basics_61/p4_61/p4_61.html" width="100%" height="100%" />`;
            break;
        case 'w4-p5':
            p.innerHTML = `<iframe src="./demo/w04_basics_61/p5_61/p5_61.html" width="100%" height="100%" />`;
            break;
        case 'w4-p6':
            p.innerHTML = `<iframe src="./demo/w04_basics_61/p6_61/p6_61.html" width="100%" height="100%" />`;
            break;
    }
}
