import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const TopBanner = () => {
  const [isBannerShown, setIsBannerShown] = useState(false);
  const [bannerType, setBannerType] = useState();
  const router = useRouter();

  console.log(router.asPath);

  useEffect(() => {
    console.log(navigator.userAgent);

    if (/android/i.test(navigator.userAgent)) {
      if (
        typeof window.SwingJavascriptInterface != 'undefined' ||
        navigator.userAgent.indexOf('SWING2APP') >= 0
      ) {
        // 앱 사용일 경우
        return;
      } // 브라우저 사용일 경우
      else if (router.asPath === '/') {
        setIsBannerShown(true);
        setBannerType('android');
      }
    } else if (
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream
    ) {
      if (
        /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
          navigator.userAgent
        ) ||
        navigator.userAgent.indexOf('SwingWebView') >= 0
      ) {
        // 앱 사용일 경우
        return;
      } // 브라우저 사용일 경우
      else if (router.asPath === '/') {
        setIsBannerShown(true);
        setBannerType('ios');
      }
    }
  }, []);

  const handleBannerClick = () => {
    if (bannerType === 'ios') {
      router.push(
        'https://apps.apple.com/kr/app/%EB%B0%94%EC%9D%B4%ED%88%AC%EB%B0%94%EC%9D%B4/id1614219353'
      );
    }
    if (bannerType === 'android') {
      router.push(
        'https://play.google.com/store/apps/details?id=com.hustay.swing.dd63def91598f4c1fbf8fee04f0480d11'
      );
    }
  };

  if (!isBannerShown) return <div></div>;

  return (
    <Container>
      <Image
        layout='fill'
        objectFit='contain'
        src='/banner/app-landing-banner.png'
        alt='app-landing-banner'
        onClick={handleBannerClick}
      />
    </Container>
  );
};

export default TopBanner;

const Container = styled.div`
  width: 100vw;
  height: 12.5vw;
  min-height: 12.5vw;
  position: relative;
`;
