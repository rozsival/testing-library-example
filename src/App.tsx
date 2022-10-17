import { AdvancedGreeter } from './components/AdvancedGreeter';
import { Greeter } from './components/Greeter';
import { Poll } from './components/Poll';
import { Registration } from './components/Registration';
import { RegistrationHooks } from './components/RegistrationHooks';
import { Tabs } from './components/Tabs';

function App() {
  return (
    <div className="App">
      <h1>React Testing Library Example</h1>
      <Tabs>
        <div title="1. Basic">
          <Greeter
            name="John"
            formal={false}
            personalMessage="Good luck mate!"
          />
        </div>
        <div title="2. Poll">
          <Poll />
        </div>
        <div title="3. User events">
          <AdvancedGreeter />
        </div>
        <div title="4. Mocking">
          <Registration />
        </div>
        <div title="5. Hooks">
          <RegistrationHooks />
        </div>
      </Tabs>
    </div>
  );
}

export default App;
