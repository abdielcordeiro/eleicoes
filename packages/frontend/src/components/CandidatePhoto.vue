<template>
  <img
    :src="photoSrc"
    :alt="altText"
    @error="handleError"
    loading="lazy"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

interface CandidateLike {
  name?: string;
  nomeUrna?: string;
  nomeCompleto?: string;
  wikipediaSlug?: string;
  fotoUrl?: string;
  photoUrl?: string;
}

const props = defineProps<{
  candidate?: CandidateLike | null;
  alt?: string;
  fallbackName?: string;
}>();

const candidateName = computed(() => {
  return props.candidate?.nomeUrna ||
         props.candidate?.name ||
         props.candidate?.nomeCompleto ||
         props.fallbackName ||
         'Candidato';
});

const altText = computed(() => {
  return props.alt || candidateName.value;
});

const fallbackUrl = computed(() => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(candidateName.value)}&background=FF6B00&color=ffffff&size=256&bold=true`;
});

const photoSrc = ref<string>('');
const hasImgError = ref(false);

function getCachedWikiImage(slug: string): string | null {
  try {
    return localStorage.getItem(`wiki_photo_${slug}`);
  } catch {
    return null;
  }
}

function setCachedWikiImage(slug: string, url: string): void {
  try {
    localStorage.setItem(`wiki_photo_${slug}`, url);
  } catch {
    // ignore storage quota error
  }
}

async function resolvePhoto() {
  hasImgError.value = false;
  const slug = props.candidate?.wikipediaSlug?.trim();

  if (slug) {
    const cached = getCachedWikiImage(slug);
    if (cached) {
      photoSrc.value = cached;
      return;
    }

    try {
      const res = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug)}`);
      if (res.ok) {
        const data = await res.json();
        const wikiImg = data.thumbnail?.source || data.originalimage?.source;
        if (wikiImg) {
          photoSrc.value = wikiImg;
          setCachedWikiImage(slug, wikiImg);
          return;
        }
      }
    } catch {
      // Network or fetch error
    }
  }

  // If no wikipediaSlug or if wiki fetch failed:
  const directUrl = props.candidate?.fotoUrl || props.candidate?.photoUrl;
  if (directUrl && !directUrl.includes('placeholder') && !directUrl.includes('unsplash.com')) {
    photoSrc.value = directUrl;
  } else {
    photoSrc.value = fallbackUrl.value;
  }
}

function handleError() {
  if (!hasImgError.value) {
    hasImgError.value = true;
    photoSrc.value = fallbackUrl.value;
  }
}

onMounted(() => {
  resolvePhoto();
});

watch(
  () => [props.candidate?.wikipediaSlug, props.candidate?.fotoUrl, props.candidate?.photoUrl, props.candidate?.name, props.candidate?.nomeUrna],
  () => {
    resolvePhoto();
  }
);
</script>
