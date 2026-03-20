import PageHeader from '../components/PageHeader';
import Roster from './team/Roster';

export default function Team() {
  return (
    <>
      <PageHeader icon="🎖" title="SPECTRE SQUAD" />
      <Roster />
    </>
  );
}
