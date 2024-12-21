'use client'

import { useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { useTogglable } from "../hooks/hooks";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const togglable = useTogglable();

  useImperativeHandle(ref, () => ({
    toggleVisibility: togglable.toggle
  }));

  return (
    <Collapsible open={togglable.value} onOpenChange={togglable.toggle}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {buttonLabel}
          {togglable.value ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        {children}
        <Button variant="outline" onClick={togglable.toggle}>Cancel</Button>
      </CollapsibleContent>
    </Collapsible>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Togglable;

