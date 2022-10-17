export type GreeterProps = {
  name?: string;
  formal?: boolean;
  personalMessage?: string;
};

export const Greeter = ({ name, formal, personalMessage }: GreeterProps) => {
  const greeting = formal ? 'Hello' : 'Whazzup 😎';
  const greetingPunctuation = formal ? '!' : '?';

  if (!name) {
    return <div>Before I greet you, I need to know your name 👋</div>;
  }

  return (
    <div>
      <h1>
        {greeting}, {name}
        {greetingPunctuation}
      </h1>
      {personalMessage && <p>{personalMessage}</p>}
    </div>
  );
};
