import Image from "next/image";

type ReassurancesProps = {
/** List of reassurances - @see ReassuranceData */
  reassurances: ReassuranceData[];

  /** Custom CSS class for the root element */
  className?: string;

  /** Global placement for all the icons, it is overridden by the individual placement */
  globalPlacement?: "left" | "right" | "top" | "bottom";

  /** Custom CSS class for the icon image element */
  iconClassName?: string;

  /** Custom CSS class for the icon container wrapper */
  iconContainerClassName?: string;

  /** Custom CSS class for the value text element */
  valueClassName?: string;

  /** Custom CSS class for the content text element */
  contentClassName?: string;

  /** Custom CSS class for the content container it contain both value and content */
  textContainerClassName?: string;
};

type ReassuranceData = {
  /** Object with url to the icon and an alt */
  icon?: { sourceUrl: string; alt?: string };

  /** Value to display after the reassurance */
  value?: string | number;

  /** Text content for the reassurance */
  content?: string;

  /** Placement that determine where the icon is compared to the text it ovveride the globalPlacement*/
  placement?: "left" | "right" | "top" | "bottom";
};

const Reassurances = ({
  reassurances,
  className,
  iconClassName,
  iconContainerClassName,
  valueClassName,
  contentClassName,
  textContainerClassName,
  globalPlacement = "left",
}: ReassurancesProps) => {
  let globalIconPlacementClass = "";

  switch (globalPlacement) {
    case "bottom":
      globalIconPlacementClass = "flex-col-reverse";
      break;
    case "top":
      globalIconPlacementClass = "flex-col";
      break;
    case "left":
      globalIconPlacementClass = "flex-row";
      break;
    case "right":
      globalIconPlacementClass = "flex-row-reverse";
      break;

    default:
      break;
  }
  return (
    <div className={`flex flex-col sm:flex-row gap-8 ${className}`}>
      {reassurances.map((reassurance, index) => {
        let iconPlacementClass = "";
        switch (reassurance.placement) {
          case "bottom":
            iconPlacementClass = "flex-col-reverse";
            break;
          case "top":
            iconPlacementClass = "flex-col";
            break;
          case "left":
            iconPlacementClass = "flex-row";
            break;
          case "right":
            iconPlacementClass = "flex-row-reverse";
            break;

          default:
            break;
        }

        return (
          <div
            key={index}
            className={`flex items-center gap-2 ${globalIconPlacementClass} ${iconPlacementClass}`}
          >
            {reassurance.icon && (
              <div
                className={`relative w-18 h-18 ${iconContainerClassName ?? ""}`}
              >
                <Image
                  src={reassurance.icon.sourceUrl}
                  alt={reassurance.icon.alt ?? ""}
                  className={`object-contain ${iconClassName ?? ""}`}
                  fill
                />
              </div>
            )}
            <div className={`${textContainerClassName ?? ""}`}>
              <div className={`${valueClassName ?? ""}`}>
                {reassurance.value}
              </div>
              <div className={`${contentClassName ?? ""}`}>
                {reassurance.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reassurances;
