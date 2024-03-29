import { useWindowSize, useMediaQuery, useOnScreen } from "../hooks";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";

const HERO_GQL = gql`
 {
    homePageCollection {
      items {
        heroDescription
        heroImage{
          url
        }
        heroImageMobile {
          url
        }
      }
    }
  }
`;

const Hero = () => {
    const { loading, error, data } = useQuery(HERO_GQL);
    const windowSize = useWindowSize();
    const isTablet = useMediaQuery("(max-width: 1041px)");
    const isPhone = useMediaQuery("(max-width: 650px)");
    const [right, setRight] = useState(0);
    const [query, setQuery] = useState({});

    useEffect(() => {
        if (!loading && !error && data) {
            setQuery(data.homePageCollection.items[0])
        }
    }, [loading, error, data])

    //  FRAMER ANIMATIONS
    const ref = useRef();
    const inView = useOnScreen(ref);

    useEffect(() => {
        if (ref.current && ref.current.width) {
            setRight((windowSize.width - ref.current.width) / 2);
        }
    }, [windowSize, inView]);


    return (
        <section className="hero">
            <motion.h2
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "tween", delay: 0.4, duration: 0.6 }}
            >
                <span>Virtual card to handle </span>
                <br />
                <motion.svg
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1,
                    }}
                    width="329"
                    height="103"
                    viewBox="0 0 329 103"
                    fill="none"
                    xmlns="http://www.w3.org/2000/motion.svg"
                >
                    <rect
                        x="3.65546"
                        y="3.35502"
                        width="300.904"
                        height="62.6051"
                        transform="matrix(0.999184 -0.0403984 0.0452327 0.998976 10.4391 23.0035)"
                        stroke="#C3F94E"
                        strokeWidth="7"
                    />
                    <ellipse cx="319" cy="7.55963" rx="8" ry="7.55963" fill="#C3F94E" />
                    <ellipse cx="321" cy="81.2661" rx="8" ry="7.55963" fill="#C3F94E" />
                    <ellipse cx="14" cy="95.4404" rx="8" ry="7.55963" fill="#C3F94E" />
                    <ellipse cx="8" cy="20.789" rx="8" ry="7.55963" fill="#C3F94E" />
                    <path
                        d="M30.5341 39.9903C30.6387 42.4361 32.543 44.2764 35.1326 44.1658C37.6743 44.0571 39.4626 42.059 39.3581 39.6132C39.2556 37.2154 37.3054 35.425 34.7637 35.5336C32.1741 35.6443 30.4317 37.5925 30.5341 39.9903ZM32.5164 71.7586L40.0456 71.4369L39.0003 46.9792L31.4712 47.301L32.5164 71.7586ZM51.8129 57.4817C51.6797 54.3645 53.2282 52.3766 55.7219 52.27C58.1677 52.1655 59.4802 53.6468 59.6052 56.5721L60.2037 70.5754L67.7328 70.2536L67.0585 54.476C66.7797 47.9539 62.3407 45.261 57.8808 45.4516C54.4759 45.5971 52.1437 47.2342 50.9493 49.6394L50.814 46.4743L43.8124 46.7735L44.8577 71.2312L52.3868 70.9094L51.8129 57.4817ZM86.1067 69.8527L85.6505 63.6745C85.127 63.793 84.4138 63.9676 83.6945 63.9983C81.7283 64.0824 80.6802 63.1663 80.5777 60.7685L80.1678 51.1772L85.3471 50.9559L85.093 45.0093L79.9137 45.2306L79.5858 37.5576L72.0566 37.8794L72.3846 45.5524L69.0756 45.6938L69.3297 51.6404L72.6387 51.499L73.0814 61.8575C73.2987 66.9409 75.9063 70.6249 82.4763 70.3441C83.8191 70.2867 85.0139 70.1396 86.1067 69.8527ZM99.4023 49.2982C101.896 49.1916 103.452 50.7586 104.109 53.7573L94.7575 54.157C95.1579 51.1611 96.7167 49.413 99.4023 49.2982ZM111.175 62.8239L105.017 60.3966C103.902 62.414 102.365 63.5367 100.351 63.6228C97.6173 63.7396 95.6191 61.9513 94.9063 58.7628L111.787 58.0414L111.699 55.9793C111.379 48.4981 106.644 43.3676 99.2584 43.6832C91.9211 43.9968 86.9234 49.5913 87.2452 57.1204C87.5731 64.7934 93.0278 69.8932 100.365 69.5796C105.401 69.3644 109.18 66.7526 111.175 62.8239ZM122.566 55.8031C122.413 52.2063 124.399 50.3438 128.521 50.1196C128.761 50.1094 129.099 50.143 129.386 50.1307L129.296 42.3995C125.652 42.5553 122.748 44.3128 121.57 47.1017L121.414 43.457L114.508 43.7521L115.554 68.2098L123.083 67.888L122.566 55.8031ZM139.627 53.7287C139.494 50.6115 141.042 48.6236 143.536 48.517C145.982 48.4125 147.294 49.8938 147.419 52.8192L148.018 66.8224L155.547 66.5006L154.873 50.723C154.594 44.2009 150.155 41.508 145.695 41.6986C142.29 41.8442 139.958 43.4812 138.763 45.8864L138.628 42.7213L131.627 43.0205L132.672 67.4782L140.201 67.1564L139.627 53.7287ZM168.61 60.9938C167.027 61.0614 165.942 60.3872 165.882 58.9964C165.829 57.7496 166.842 55.5924 173.302 54.98L173.361 56.3707C173.476 59.0563 170.912 60.8954 168.61 60.9938ZM174.192 65.7037L181.098 65.4086L180.465 50.5901C180.153 43.3008 175.514 40.4242 169.184 40.6948C164.532 40.8936 160.867 42.8278 158.399 45.7679L162.709 49.9557C164.496 47.9095 166.754 46.8041 168.912 46.7119C171.31 46.6094 172.992 47.7386 173.101 50.2803C163.62 51.0218 158.138 54.2828 158.388 60.1335C158.577 64.5454 162.282 66.9334 166.55 66.751C169.811 66.6116 172.577 65.0041 174.09 63.3059L174.192 65.7037ZM199.328 65.0138L198.872 58.8357C198.349 58.9541 197.635 59.1287 196.916 59.1595C194.95 59.2435 193.902 58.3274 193.799 55.9296L193.389 46.3384L198.569 46.117L198.315 40.1704L193.135 40.3918L192.807 32.7188L185.278 33.0406L185.606 40.7136L182.297 40.855L182.551 46.8016L185.86 46.6602L186.303 57.0187C186.52 62.1021 189.128 65.7861 195.698 65.5053C197.041 65.4479 198.236 65.3007 199.328 65.0138ZM200.496 32.7265C200.6 35.1723 202.505 37.0127 205.094 36.902C207.636 36.7934 209.424 34.7952 209.32 32.3494C209.217 29.9516 207.267 28.1612 204.725 28.2699C202.136 28.3805 200.393 30.3287 200.496 32.7265ZM202.478 64.4949L210.007 64.1731L208.962 39.7154L201.433 40.0372L202.478 64.4949ZM212.808 51.7542C213.136 59.4272 218.639 64.5248 226.072 64.2072C233.553 63.8874 238.601 58.3389 238.273 50.6659C237.951 43.1367 232.446 37.9911 224.965 38.3108C217.532 38.6285 212.486 44.225 212.808 51.7542ZM220.433 51.4283C220.261 47.4 222.158 44.5804 225.227 44.4492C228.297 44.318 230.476 46.9634 230.648 50.9917C230.824 55.116 228.879 57.9376 225.81 58.0688C222.74 58.1999 220.609 55.5525 220.433 51.4283ZM249.009 49.054C248.875 45.9368 250.424 43.9489 252.918 43.8423C255.363 43.7378 256.676 45.2191 256.801 48.1444L257.399 62.1476L264.928 61.8259L264.254 46.0483C263.975 39.5262 259.536 36.8333 255.076 37.0239C251.672 37.1694 249.339 38.8065 248.145 41.2117L248.01 38.0466L241.008 38.3458L242.053 62.8035L249.582 62.4817L249.009 49.054ZM277.991 56.3191C276.409 56.3867 275.323 55.7125 275.264 54.3217C275.21 53.0749 276.223 50.9176 282.683 50.3053L282.742 51.696C282.857 54.3815 280.293 56.2207 277.991 56.3191ZM283.574 61.029L290.479 60.7339L289.846 45.9154C289.534 38.6261 284.895 35.7495 278.565 36.0201C273.913 36.2189 270.249 38.1531 267.78 41.0932L272.091 45.281C273.877 43.2348 276.136 42.1294 278.294 42.0371C280.692 41.9347 282.373 43.0639 282.482 45.6056C273.001 46.3471 267.519 49.6081 267.769 55.4588C267.958 59.8707 271.663 62.2587 275.931 62.0763C279.192 61.9369 281.958 60.3294 283.471 58.6312L283.574 61.029ZM294.882 60.5457L302.411 60.2239L300.956 26.175L293.427 26.4968L294.882 60.5457Z"
                        fill="#C3F94E"
                    />
                </motion.svg>
                <span className="span">transactions.</span>
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "tween", delay: 0.8, duration: 0.6 }}
            >
                <span>
                    {query.heroDescription}
                </span>
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "tween", delay: 1.2, duration: 0.6 }}
                className="input-area"
            >
                <motion.input
                    whileHover={{ borderColor: "#d0fa76", scale: 1.02 }}
                    transition={{ type: "tween" }}
                    type="text"
                    placeholder="Email address"
                />
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "tween" }}
                >
                    Get early access
                </motion.button>
            </motion.div>

            {!isPhone ? (
                <motion.img
                    ref={ref}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "tween", delay: 1.6, duration: 0.6 }}
                    whileInView={{ x: 0 }}
                    style={{
                        left: `${isTablet ? 0 : `${right}px`}`,
                        width: `${isTablet ? "100%" : "auto"}`,
                    }}
                    id="phoneImg"
                    src={query.heroImage && query.heroImage.url}
                    alt="phone"
                />
            ) : (
                <motion.img
                    ref={ref}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileInView={{ x: 0 }}
                    transition={{ type: "tween", delay: 1.6, duration: 0.6 }}
                    style={{ left: `${right}px` }}
                    id="phoneImg"
                    src={query.heroImageMobile && query.heroImageMobile.url}
                    alt="phone"
                />
            )}
        </section>
    );
};

export default Hero;
