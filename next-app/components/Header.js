import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
import Modal from "react-modal";

import SearchBar from "./SearchBar";
import UploadModal from "./UploadModal";

import { modalStyles } from "../utils/constants";

import InstagramLogo from "../static/images/logo.png";
import { GrHomeRounded } from "react-icons/gr";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";

Modal.setAppElement("#__next");

const uploader = new Uploader({
  apiKey: "public_kW15b8eFsgxw9yiamkzK9CfB8Adr",
});

const uploaderOptions = {
  multi: true,
  path: {
    folder: "/",
  },

  // Comment out this line & use 'onUpdate' instead of
  // 'onComplete' to have the dropzone close after upload.
  showFinishButton: true,

  styles: {
    colors: {
      primary: "#377dff",
    },
  },
};

const style = {
  wrapper: `navigation fixed z-20 top-0`,
  headerContainer: `header-container`,
  logoContainer: `h-[1.8rem] w-[6.4rem] relative mt-[.6rem]`,
  image: `object-contain`,
  headerMain: `header-icons flex ml-auto items-center`,
  headerIcon: `mr-[.8rem] cursor-pointer`,
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadModalStatus, setUploadModalStatus] = useState(false);
  const [modalDescriptionStatus, setModalDescriptionStatus] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const router = useRouter();

  const openUploader = () => {
    setIsOpen(true);
    setUploadModalStatus(true);
    // {
    //   uploader
    //     .onUpdate({ maxFileCount: 1 })
    //     .then((files) => {
    //       if (files.length === 0) {
    //         alert("No files selected.");
    //       } else {
    //         router.push(`/?image=${files[0].fileUrl}`);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
  };

  return (
    <nav className={style.wrapper}>
      <div className={style.headerContainer}>
        <div className={style.logoContainer}>
          <Image src={InstagramLogo} className={style.image} layout="fill" />
        </div>

        <SearchBar />

        <div className={style.headerMain}>
          <GrHomeRounded className={style.headerIcon} size={20} />
          <IoPaperPlaneOutline className={style.headerIcon} size={22} />

          <AiOutlineCloudUpload
            className={style.headerIcon}
            size={22}
            onClick={openUploader}
          />

          <ConnectButton />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => router.push("/")}
        style={modalStyles}
      >
        {uploadModalStatus && (
          <UploadDropzone
            uploader={uploader}
            options={uploaderOptions}
            onComplete={(files) => {
              alert(files.map((x) => x.fileUrl).join("\n"));
              setImgUrl(files[0].fileUrl)
              setUploadModalStatus(false)
              setModalDescriptionStatus(true);
            }}
            width="600px"
            height="375px"
          />
        )}

          {modalDescriptionStatus && <UploadModal imgUrl={imgUrl} setIsOpen={setIsOpen}/>}
      </Modal>
    </nav>
  );
};

export default Header;
