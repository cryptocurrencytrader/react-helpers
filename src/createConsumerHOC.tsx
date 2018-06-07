import hoistNonReactStatic from "hoist-non-react-statics";
import React from "react";
import getDisplayName from "react-display-name";

const defaultPropName = "context";

export type ConsumerHOCProps<P, I extends string, T> = P & Record<I, T>;

export default function createConsumerHOC<T>(
  Consumer: React.Consumer<T>,
  name: string = "Consumer",
) {
  return <I extends string = typeof defaultPropName>(
    { inject = defaultPropName as I }: { inject?: I } = { inject: undefined },
  ) => {
    return <P extends {}>(WrappedComponent: React.ComponentType<ConsumerHOCProps<P, I, T>>) => {
      class ConsumerHOC extends React.Component<ConsumerHOCProps<P, I, T>> {
        public static displayName: string = `${name}(${getDisplayName(WrappedComponent)})`;

        public render() {
          return (
            <Consumer>
              {(value: T | {}) => <WrappedComponent {...this.props} {...{ [inject]: value as T }}/>}
            </Consumer>
          );
        }
      }

      hoistNonReactStatic(ConsumerHOC, WrappedComponent);
      return ConsumerHOC as React.ComponentClass<ConsumerHOCProps<P, I, T>>;
    };
  };
}
