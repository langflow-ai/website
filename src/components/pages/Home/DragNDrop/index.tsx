'use client';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import DrawLine from './DrawLine';
import { positionHelpers } from '@/utils/positionHelpers';
import useCheckMobile from '@/hooks/useCheckMobile';
import { ElementConfig, useRelativeElementPositions } from '@/hooks/useRelativeElementPositions';
import { LineCoordinate } from '@/lib/types/paths';
import Display from '@/components/ui/Display';

const DragNDrop: React.FC = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const box1Ref = useRef<HTMLImageElement | null>(null);
  const box2Ref = useRef<HTMLImageElement | null>(null);
  const box3Ref = useRef<HTMLImageElement | null>(null);
  const box4Ref = useRef<HTMLImageElement | null>(null);

  const { isMobile } = useCheckMobile(1200);

  const onImageLoad = useCallback(() => {
    setLoadedCount((c) => c + 1);
  }, []);

  const elementConfigs = useMemo(
    (): ElementConfig[] => [
      { ref: box1Ref, subtractContainerLeft: true },
      { ref: box2Ref, subtractContainerLeft: true },
      { ref: box3Ref, subtractContainerLeft: true },
      { ref: box4Ref, subtractContainerLeft: true }
    ],
    []
  );

  const positions = useRelativeElementPositions(containerRef, elementConfigs);

  const lines = useMemo<LineCoordinate[]>(() => {
    if (positions.length < 4) return [];

    const generatedLines: (LineCoordinate | null)[] = [];

    if (positions[0]?.width && positions[1]?.width) {
      generatedLines.push({
        id: 'line-1',
        start: isMobile ? positionHelpers.getBottomRight(positions[0], 50) : positionHelpers.getRightCenter(positions[0]),
        end: isMobile ? positionHelpers.getTopRight(positions[1], 50) : positionHelpers.getTopRight(positions[1], 50),
        style: isMobile ? 'straight' : 'curvePath'
      });
    }

    if (positions[1]?.width && positions[2]?.width) {
      generatedLines.push({
        id: 'line-2',
        start: isMobile ? positionHelpers.getLeftBottom(positions[1], 50) : positionHelpers.getLeftCenter(positions[1], 75),
        end: isMobile ? positionHelpers.getLeftTop(positions[2], 50) : positionHelpers.getTopLeft(positions[2], 25),
        style: isMobile ? 'straight' : 'curvePath'
      });
    }

    if (positions[2]?.width && positions[3]?.width) {
      generatedLines.push({
        id: 'line-3',
        start: positionHelpers.getRightBottom(positions[2], 100),
        end: positionHelpers.getTopCenter(positions[3]),
        style: 'sPath'
      });
    }

    return generatedLines.filter((line) => line !== null) as LineCoordinate[];
  }, [positions, isMobile]);

  return (
    <div className={`${styles.container} container-wide`} ref={containerRef}>
      <section className={`${styles.heading} ${styles.heading_first}`}>
        <Display size={500} weight={400} className={`${styles.heading_title} ${styles.heading_title_first}`}>
          Drag. Drop. Deploy.
        </Display>
        <Display size={150} weight={300} className={`${styles.heading_subtitle} ${styles.heading_subtitle_first}`}>
          Don&apos;t let boilerplate code slow you down. Visual state flows, reusable components, and rapid iteration for you. Focus on creating AI magic.
        </Display>
      </section>

      <section className={styles.image}>
        <Image
          ref={box1Ref}
          src="/images/drag-drop-deploy.png"
          alt="Agent code and UI"
          width={1000}
          height={478}
          className={`${styles.responsiveImg} ${styles.desktopImg}`}
          onLoadingComplete={onImageLoad}
          priority
        />
        <Image src="/images/mobile-agent.png" alt="mobile-agent" width={600} height={500} className={`${styles.responsiveImg} ${styles.mobileImg}`} />
      </section>

      <section className={styles.image_relative}>
        <section className={`${styles.heading} ${styles.heading_absolute}`}>
          <Display size={400} weight={300} className={styles.heading_title}>
            Limitless Control
          </Display>
          <Display size={150} weight={300} className={`${styles.heading_subtitle} ${styles.heading_subtitle_second}`}>
            Use Python to customize anything and everything
          </Display>
        </section>
        <Image
          ref={box2Ref}
          src="/images/run-share-collab.png"
          alt="Run, Share and Collaborate"
          width={1000}
          height={536}
          className={`${styles.responsiveImg} ${styles.desktopImg}`}
          onLoadingComplete={onImageLoad}
          priority
        />
        <Image src="/images/mobile-collab.png" alt="mobile-collab" width={600} height={500} className={`${styles.responsiveImg} ${styles.mobileImg}`} />
      </section>

      <section className={`${styles.heading} ${styles.heading_center}`}>
        <Display size={400} weight={300} className={styles.heading_title}>
          Run, Share and Collaborate.
        </Display>
        <Display size={150} weight={300} className={`${styles.heading_subtitle} ${styles.heading_subtitle_third}`}>
          Choose from hundreds of pre-built flows and components
        </Display>
      </section>
      <section className={`${styles.image} ${styles.image_center}`}>
        <Image
          ref={box3Ref}
          src="/svgs/realtime-iteration.svg"
          alt="Real-time Iteration"
          width={1280}
          height={383}
          className={`${styles.responsiveImg} ${styles.desktopImg}`}
          onLoadingComplete={onImageLoad}
          priority
        />
        <Image src="/images/mobile-infra.png" alt="mobile-infra" width={1260} height={700} className={`${styles.responsiveImg} ${styles.mobileImg}`} />
      </section>
      <section className={styles.heading}>
        <Display size={400} weight={300} className={styles.heading_title}>
          Agents at your service
        </Display>
        <Display size={150} weight={300} className={`${styles.heading_subtitle} ${styles.heading_subtitle_fourth}`}>
          Run a single or fleet of agents with access to all your components as tools
        </Display>
      </section>
      <section className={`${styles.image} ${styles.image_right}`}>
        <Image ref={box4Ref} src="/images/dialog-api.png" alt="Dialog API" width={800} height={362} className={styles.responsiveImg} onLoadingComplete={onImageLoad} priority />
      </section>
      <section className={`${styles.heading} ${styles.heading_last}`}>
        <Display size={400} weight={300} className={styles.heading_title}>
          Flow as an API
        </Display>
        <Display size={150} weight={300} className={`${styles.heading_subtitle} ${styles.heading_subtitle_fifth}`}>
          Use a free, enterprise-grade cloud to deploy your app
        </Display>
      </section>
      {loadedCount >= elementConfigs.length && <DrawLine lines={lines} instanceId="dragndrop" />}
    </div>
  );
};

export default DragNDrop;
