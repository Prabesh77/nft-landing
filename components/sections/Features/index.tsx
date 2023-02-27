import classes from "./Features.module.scss"
const Features = () => {
  const features = [
    {
      id: 1,
      image: "/assets/features/safe.png",
      title: "SAFE & SECURE",
      desc: "YIELDCLUB is audited by HazeCrypto and verified on BSC",
    },
    {
      id: 2,
      image: "/assets/features/smart.png",
      title: "SMART FUNCTIONS",
      desc: "The contract has smart rules. See Whitepaper for longevity",
    },
    {
      id: 3,
      image: "/assets/features/anti-whale.png",
      title: "ANTI-WHALE PROTECTION",
      desc: "Daily withdrawal of max 5 BNB",
    },
    {
      id: 4,
      image: "/assets/features/immutable.png",
      title: "IMMUTABLE",
      desc: "The contract can´t be changed, deleted or controlled.",
    },
    {
      id: 5,
      image: "/assets/features/active-community.png",
      title: "ACTIVE COMMUNITY",
      desc: "Regular Livecalls and Events!",
    },
    {
      id: 6,
      image: "/assets/features/insurance.png",
      title: "INSURANCE POOL",
      desc: "10% withdrawal fee will be used to support the contract",
    },
    {
      id: 7,
      image: "/assets/features/no-ceo.png",
      title: "NO CEO OR OWNER",
      desc: "The contract belongs to the community. There is no 3rd party that controls it",
    },
    {
      id: 8,
      image: "/assets/features/eco.png",
      title: "ECOSYSTEM AND ROADMAP",
      desc: "The Community is dedicated to build Products that serve the Contract.",
    },
  ]
  return (
    <div className={classes.features_wrapper}>
      <div className={classes.features_container}>
        {features?.map((feature) => (
          <FeatureBox
            key={feature.id}
            image={feature.image}
            title={feature.title}
            desc={feature.desc}
          />
        ))}
      </div>
    </div>
  )
}

const FeatureBox = ({ image, title, desc }) => {
  return (
    <div className={classes.box}>
      <div className={classes.icon}>
        <img src={image} alt={title} />
      </div>
      <div className={classes.content}>
        <p>{title}</p>
        <span>{desc}</span>
      </div>
    </div>
  )
}

export default Features
