import ReactGA from "react-ga";

export const initGA = () => {
    // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
    ReactGA.initialize("UA-123071607-1");
};

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });

    // This just needs to be called once since we have no routes in this case.
    ReactGA.pageview(window.location.pathname);
};
