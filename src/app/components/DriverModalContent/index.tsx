"use client";

import React, { useState } from "react";
import styles from "../DriverModal/DriverModal.module.css";
import SocialButton from "../SocialButton/SocialButton";
import Avatar from "../Avatar";
import { useUser } from "@/app/hooks/useUser";
import Button from "../Button/Button";
import rideActions from "@/app/actions/rideActions";
import { useFetchRide } from "@/app/hooks/useFetchRide";
import Loader from "../Loader/Loader";
import i18next from "i18next";

interface DriverModalContentProps {
  userId: string | undefined;
  isOwner: boolean;
  rideId: string;
}

const DriverModalContent: React.FC<DriverModalContentProps> = (
  props: DriverModalContentProps
) => {
  const { userId, isOwner, rideId } = props;
  const { user: driver } = useUser(userId);
  const { rideData } = useFetchRide(rideId);
  const [isLoading, setIsLoading] = useState(false);

  if (!userId) return null;

  const isApproved =
    driver && rideData?.passengers.accepted.includes(driver._id);

  const onApprove = async () => {
    setIsLoading(true);
    if (isApproved) {
      await rideActions.removePassenger(rideId, driver!._id);
    } else {
      await rideActions.approveRideRequest(rideId, driver!._id);
    }
    setIsLoading(false);
    window.location.reload();
  };
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <Avatar
          src={driver?.profilePicture}
          alt="Driver's avatar"
          size={100}
          className={styles.avatar}
        />
        <h2 className={styles.name}>
          {driver?.firstName + " " + driver?.lastName}
        </h2>
      </div>
      <div className={styles.info}>
        {isOwner && (
          <Button
            variant="yellow"
            onClick={onApprove}
            disabled={!driver?.phoneNumber}
            size="large"
          >
            {isLoading ? (
              <Loader />
            ) : isApproved ? (
              i18next.t("common:driver-modal.remove-passenger")
            ) : (
              i18next.t("common:driver-modal.approve")
            )}
          </Button>
        )}
        <SocialButton
          type="phone"
          onClick={() =>
            driver?.phoneNumber &&
            window.open(`tel:${driver.phoneNumber}`, "_blank")
          }
          disabled={!driver?.phoneNumber}
        >
          {i18next.t("common:driver-modal.phone")}
        </SocialButton>

        <SocialButton
          type="whatsapp"
          onClick={() =>
            driver?.phoneNumber &&
            window.open(`https://wa.me/+972${driver.phoneNumber}`, "_blank")
          }
          disabled={!driver?.phoneNumber}
        >
          {i18next.t("common:driver-modal.whatsapp")}
        </SocialButton>

        <SocialButton
          type="instagram"
          onClick={() => window.open(driver?.instagramUrl, "_blank")}
          disabled={!driver?.instagramUrl}
        >
          {i18next.t("common:driver-modal.instagram")}
        </SocialButton>

        <SocialButton
          type="facebook"
          onClick={() => window.open(driver?.facebookUrl, "_blank")}
          disabled={!driver?.facebookUrl}
        >
          {i18next.t("common:driver-modal.facebook")}
        </SocialButton>
      </div>
    </div>
  );
};

export default DriverModalContent;
