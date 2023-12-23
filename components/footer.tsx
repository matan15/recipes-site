import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
library.add(fab)

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-center item-center mb-4">
                <div className="mr-4">
                    <a href="https://www.github.com/matan15" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={["fab", "github"]} size="2x" />
                    </a>
                </div>
                <div className="mr-4">
                    <a href="https://twitter.com/matan_naydis" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={["fab", "x-twitter"]} size="2x" />
                    </a>
                </div>
                <div className="mr-4">
                    <a href="https://www.linkedin.com/in/matan15/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={["fab", "linkedin"]} size="2x" />
                    </a>
                </div>
            </div>
            <div className="container mx-auto text-center">
                <p>&copy; 2023 Cook&Eat. All rights reserved.</p>
            </div>
        </footer>
    );
}