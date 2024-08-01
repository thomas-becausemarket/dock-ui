import { subscriptions } from "../SubscriptionCard/SubscriptionCard.stories";
import { SubCard } from "./SubCard";

export const Default = () => (
    <SubCard title={`Subscription #${subscriptions[0].id}`} subscription={subscriptions[0]} titleIcon='clipboard' />
);