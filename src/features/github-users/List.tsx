import React from "react";

interface UsersListProps extends React.HTMLAttributes<HTMLElement> {}

function List(props: UsersListProps) {
  return <section>It's work</section>;
}

export default React.memo(List);
