import Header from '../src/components/Header';
import SectionPresentation from '../src/components/SectionPresentation';

export default function Main() {
  return (
    <div className='w-full bg-hero-pattern bg-no-repeat bg-fixed'>
      <Header />
      <SectionPresentation />
    </div>
  );
}
