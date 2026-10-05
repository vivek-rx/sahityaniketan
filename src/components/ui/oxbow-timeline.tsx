"use client";

import React from "react";
// @ts-ignore
import OxbowComponent from "./oxbow-engine";

export interface OxbowMilestone {
  year?: string;
  label?: string;
  title?: string;
  description?: string;
  image?: any;
  imageUrl?: string;
  link?: string;
  linkText?: string;
}

export interface OxbowTimelineProps {
  milestones?: OxbowMilestone[];
  startAt?: number;
  background?: string;
  layout?: {
    anchor?: "center" | "left";
    spacing?: number;
    curveOffset?: number;
    padding?: number;
    edgeFade?: number;
  };
  curve?: {
    shape?: "wave" | "ripple" | "swell" | "flat";
    amplitude?: number;
    lift?: number;
    liftSpread?: number;
    liftDirection?: "toward" | "away";
    thickness?: number;
    trackColor?: string;
    dashed?: boolean;
    showTrail?: boolean;
    trailThickness?: number;
    trailColor?: string;
    connector?: boolean;
  };
  markers?: {
    size?: number;
    activeSize?: number;
    fill?: string;
    border?: string;
    borderWidth?: number;
    activeFill?: string;
    hoverFill?: string;
    hoverScale?: number;
    glow?: boolean;
    pulse?: boolean;
    showYears?: boolean;
    showLabels?: boolean;
    yearFont?: React.CSSProperties;
    yearColor?: string;
    activeYearColor?: string;
    labelColor?: string;
  };
  card?: {
    position?: "below" | "above" | "alternate";
    align?: "center" | "start";
    width?: number;
    gap?: number;
    padding?: number;
    radius?: number;
    background?: string;
    borderColor?: string;
    borderWidth?: number;
    hoverBorder?: string;
    shadow?: boolean;
    reveal?: "rise" | "fade" | "scale" | "slide";
  };
  content?: {
    showImage?: boolean;
    imageLayout?: "top" | "left";
    imageInset?: number;
    imageHeight?: number;
    imageRadius?: number;
    imageFit?: "cover" | "contain";
    showYear?: boolean;
    yearOnImage?: boolean;
    bigYearFont?: React.CSSProperties;
    bigYearColor?: string;
    scrim?: string;
    showLabel?: boolean;
    imageLabelBackground?: string;
    imageLabelColor?: string;
    accentBar?: boolean;
    showIndex?: boolean;
    showDescription?: boolean;
    descriptionLines?: number;
    showLink?: boolean;
    newTab?: boolean;
    linkStyle?: "pill" | "text";
    linkBackground?: string;
    linkPillColor?: string;
    titleFont?: React.CSSProperties;
    titleColor?: string;
    bodyFont?: React.CSSProperties;
    bodyColor?: string;
    yearFont?: React.CSSProperties;
    yearColor?: string;
    labelFont?: React.CSSProperties;
    labelBackground?: string;
    labelColor?: string;
    linkFont?: React.CSSProperties;
    linkColor?: string;
  };
  motion?: {
    duration?: number;
    easing?: "glide" | "silk" | "current" | "surge" | "overshoot" | "linear";
  };
  interaction?: {
    activateOn?: "click" | "hover";
    drag?: boolean;
    wheel?: boolean;
    keyboard?: boolean;
    loop?: boolean;
    autoplay?: boolean;
    interval?: number;
    pauseOnHover?: boolean;
  };
  navigation?: {
    arrows?: boolean;
    arrowPlacement?: "corner" | "bottom" | "sides";
    arrowSize?: number;
    arrowBackground?: string;
    arrowColor?: string;
    arrowBorder?: string;
    arrowHoverBackground?: string;
    arrowHoverColor?: string;
    progress?: "counterBar" | "counter" | "bar" | "dots" | "none";
    progressPlacement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
    progressFont?: React.CSSProperties;
    progressColor?: string;
    progressTrack?: string;
    progressFill?: string;
  };
  responsive?: {
    breakpoint?: number;
    mode?: "vertical" | "compact";
  };
  className?: string;
  style?: React.CSSProperties;
}

export function OxbowTimeline(props: OxbowTimelineProps) {
  return <OxbowComponent {...props} />;
}

export default OxbowTimeline;
