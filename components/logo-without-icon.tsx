import Image from "next/image";

export const LogoWithoutIcon = () => {
    return (
        <Image 
            height={600}
            width={600}
            alt="logo"
            src="/logo-without-icon.svg"
        />
    );
}