(function() {
    'use strict';

    // Instant redirect function
    function checkAndRedirect() {
        const url = window.location.href;
        // Check if user is on the root homepage
        if (url === "https://www.youtube.com/" || url === "https://www.youtube.com" || url === "https://www.youtube.com/?app=desktop") {
            window.location.replace("https://www.youtube.com/feed/subscriptions");
            return;
        }

        // Check for Shorts URL
        if (window.location.pathname.startsWith('/shorts/')) {
            const videoId = window.location.pathname.split('/')[2];
            if (videoId) {
                window.location.replace(`https://www.youtube.com/watch?v=${videoId}`);
            }
        }
    }

    // Run immediately before DOM loads
    checkAndRedirect();

    // Intercept YouTube's internal history router for lightning-fast SPA navigation catches
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function() {
        originalPushState.apply(this, arguments);
        checkAndRedirect();
    };

    history.replaceState = function() {
        originalReplaceState.apply(this, arguments);
        checkAndRedirect();
    };

    window.addEventListener('popstate', checkAndRedirect);
    window.addEventListener('yt-navigate-finish', checkAndRedirect);
})();