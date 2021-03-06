/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React from 'react';
import { $Keys } from 'utility-types';
import { FormattedMessage } from '@kbn/i18n/react';
import { KqlQuerySuggestionProvider } from './types';
import { autocomplete } from '../../../../../../src/plugins/data/public';

const bothArgumentsText = (
  <FormattedMessage
    id="xpack.kueryAutocomplete.andOperatorDescription.bothArgumentsText"
    defaultMessage="both arguments"
    description="Part of xpack.kueryAutocomplete.andOperatorDescription. Full text: 'Requires both arguments to be true'"
  />
);

const oneOrMoreArgumentsText = (
  <FormattedMessage
    id="xpack.kueryAutocomplete.orOperatorDescription.oneOrMoreArgumentsText"
    defaultMessage="one or more arguments"
    description="Part of xpack.kueryAutocomplete.orOperatorDescription. Full text: 'Requires one or more arguments to be true'"
  />
);

const conjunctions: Record<string, JSX.Element> = {
  and: (
    <p>
      <FormattedMessage
        id="xpack.kueryAutocomplete.andOperatorDescription"
        defaultMessage="Requires {bothArguments} to be true"
        values={{
          bothArguments: <span className="kbnSuggestionItem__callout">{bothArgumentsText}</span>,
        }}
        description="Full text: ' Requires both arguments to be true'. See
          'xpack.kueryAutocomplete.andOperatorDescription.bothArgumentsText' for 'both arguments' part."
      />
    </p>
  ),
  or: (
    <p>
      <FormattedMessage
        id="xpack.kueryAutocomplete.orOperatorDescription"
        defaultMessage="Requires {oneOrMoreArguments} to be true"
        values={{
          oneOrMoreArguments: (
            <span className="kbnSuggestionItem__callout">{oneOrMoreArgumentsText}</span>
          ),
        }}
        description="Full text: 'Requires one or more arguments to be true'. See
          'xpack.kueryAutocomplete.orOperatorDescription.oneOrMoreArgumentsText' for 'one or more arguments' part."
      />
    </p>
  ),
};

export const setupGetConjunctionSuggestions: KqlQuerySuggestionProvider = core => {
  return (querySuggestionsArgs, { text, end }) => {
    let suggestions: autocomplete.QuerySuggestion[] | [] = [];

    if (text.endsWith(' ')) {
      suggestions = Object.keys(conjunctions).map((key: $Keys<typeof conjunctions>) => ({
        type: autocomplete.QuerySuggestionsTypes.Conjunction,
        text: `${key} `,
        description: conjunctions[key],
        start: end,
        end,
      }));
    }

    return Promise.resolve(suggestions);
  };
};
