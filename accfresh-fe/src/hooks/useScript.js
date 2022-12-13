import { useEffect } from 'react';

const useScript = url => {
    useEffect(() => {
        const librarySource = [
            "assets/libs/jquery/dist/jquery.min.js",
            "assets/libs/jquery.countdown/jquery.countdown.min.js",
            "assets/libs/owl.carousel/dist/owl.carousel.min.js",
            "assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js",
            "assets/js/app.js"
        ]

        let scriptElements = [];
        librarySource.forEach((src) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.type = "text/babel";

            document.body.appendChild(script);
            scriptElements.push(script);
        })
        
  
        return () => {
            scriptElements.forEach(element => {
                document.body.removeChild(element);
            })
        }
    }, [url]);
  };
  
  export default useScript;