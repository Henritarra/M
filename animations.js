(() => {
    if (!window.gsap || !window.ScrollTrigger) return;

    const { gsap, ScrollTrigger } = window;
    // const { gsap, ScrollTrigger, ScrollSmoother } = window;
    gsap.registerPlugin(ScrollTrigger);
    // if (ScrollSmoother) gsap.registerPlugin(ScrollSmoother);

    const motion = gsap.matchMedia();

    motion.add("(prefers-reduced-motion: no-preference)", () => {
        const initializedElements = new Set();
        // let smoother;
        // let smoothWrapper;
        // let smoothContent;

        // if (ScrollSmoother) {
        //     smoothWrapper = document.createElement("div");
        //     smoothWrapper.id = "smooth-wrapper";
        //     smoothContent = document.createElement("div");
        //     smoothContent.id = "smooth-content";

        //     while (document.body.firstChild) {
        //         smoothContent.appendChild(document.body.firstChild);
        //     }

        //     smoothWrapper.appendChild(smoothContent);
        //     document.body.appendChild(smoothWrapper);

        //     smoother = ScrollSmoother.create({
        //         wrapper: smoothWrapper,
        //         content: smoothContent,
        //         smooth: 1,
        //         smoothTouch: 0
        //     });
        // }

        const introItems = document.querySelectorAll("header nav > #nome, header nav > #buttons");

        if (introItems.length) {
            gsap.from(introItems, {
                autoAlpha: 0,
                y: -14,
                duration: 0.65,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "transform,opacity,visibility"
            });
        }

        const reveal = (elements) => {
            gsap.utils.toArray(elements).forEach((element) => {
                if (element.dataset.gsapRevealReady) return;
                element.dataset.gsapRevealReady = "true";
                initializedElements.add(element);

                gsap.fromTo(element, {
                    autoAlpha: 0,
                    y: 18
                }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.65,
                    ease: "power2.out",
                    clearProps: "transform,opacity,visibility",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        once: true
                    }
                });
            });
        };

        reveal(document.querySelectorAll(
            ".bio-div, .bio p, .bands, .myconcerts, .slider, .accordeon-div, #contactdiv, footer[data-site-footer]"
        ));
        reveal(document.querySelectorAll(".upcomingconcerts .concerts2"));

        const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
        window.siteAnimations = { reveal, refresh };

        const observer = new MutationObserver((records) => {
            const newTargets = [];

            records.forEach((record) => {
                record.addedNodes.forEach((node) => {
                    if (!(node instanceof Element)) return;

                    if (node.matches(".accordeon-div") || (node.matches(".concerts2") && node.closest(".upcomingconcerts"))) {
                        newTargets.push(node);
                    }

                    node.querySelectorAll(".accordeon-div, .upcomingconcerts .concerts2").forEach((element) => {
                        newTargets.push(element);
                    });
                });
            });

            if (newTargets.length) {
                reveal(newTargets);
                refresh();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            initializedElements.forEach((element) => element.removeAttribute("data-gsap-reveal-ready"));
            // if (smoother) smoother.kill();

            // if (smoothWrapper?.isConnected && smoothContent?.isConnected) {
            //     while (smoothContent.firstChild) {
            //         document.body.insertBefore(smoothContent.firstChild, smoothWrapper);
            //     }
            //     smoothWrapper.remove();
            // }

            delete window.siteAnimations;
        };
    });
})();
