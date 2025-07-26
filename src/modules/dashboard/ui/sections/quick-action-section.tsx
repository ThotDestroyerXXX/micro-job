import { QUICK_ACTION_CONSTANTS } from "../../constant";
import QuickActionCard from "../components/quick-action-card";

export default function QuickAction() {
  return (
    <section>
      <h2 className='text-xl font-semibold text-gray-900 mb-4'>
        Quick Actions
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {QUICK_ACTION_CONSTANTS.map((action) => (
          <QuickActionCard
            key={action.title}
            icon={action.icon}
            title={action.title}
            description={action.description}
            color={action.color}
            link={action.link}
          />
        ))}
      </div>
    </section>
  );
}
