import { useCallback } from 'react';

interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

export const useShare = () => {
  const share = useCallback(async (options: ShareOptions) => {
    const { title, text, url } = options;
    
    // Check if native sharing is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return { success: true, method: 'native' };
      } catch (error) {
        console.log('Native share cancelled or failed:', error);
        return { success: false, method: 'native', error };
      }
    }
    
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      return { success: true, method: 'clipboard' };
    } catch (error) {
      console.log('Clipboard fallback failed:', error);
      return { success: false, method: 'clipboard', error };
    }
  }, []);

  const shareToTwitter = useCallback((text: string, url: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    return { success: true, method: 'twitter' };
  }, []);

  const shareToLinkedIn = useCallback((url: string) => {
    const encodedUrl = encodeURIComponent(url);
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
    return { success: true, method: 'linkedin' };
  }, []);

  const shareToFacebook = useCallback((url: string) => {
    const encodedUrl = encodeURIComponent(url);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    return { success: true, method: 'facebook' };
  }, []);

  return {
    share,
    shareToTwitter,
    shareToLinkedIn,
    shareToFacebook,
  };
};
