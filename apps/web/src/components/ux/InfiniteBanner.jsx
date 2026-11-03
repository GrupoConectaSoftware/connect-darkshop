import InfiniteMarquee from './InfiniteMarquee'

export default function InfiniteBanner({ imageSrc, speed = 80, direction = 'left' }) {
  return <InfiniteMarquee speed={speed} direction={direction} gapClass="gap-0" className="bg-dark-950">{[0, 1, 2, 3].map((copy) => <img key={copy} src={imageSrc} alt="" aria-hidden="true" className="h-40 w-auto max-w-none shrink-0 sm:h-52 lg:h-60" />)}</InfiniteMarquee>
}
