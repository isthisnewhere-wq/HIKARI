# Internal-linking map

All target paths below are implemented as server routes. Contextual links appear inside the described section; sitewide navigation and footer links are generated from the route list. The site has no article pages yet, so article-to-service paths are editorial plans, not existing links.

| Source page | Target page | Anchor text | Rationale | Placement | QA result | Owner review |
|---|---|---|---|---|---|---|
| Home | Study abroad consultancy in Itahari | See the Itahari consultancy page | Connects the local overview to its dedicated local page | Destination cards section intro | Route exists; descriptive anchor | Confirm business display name and service scope |
| Home | Visa and admissions disclaimer | Read the admissions and visa disclaimer | Clarifies who makes education and visa decisions | Official source note | Route exists; accurate anchor | Review disclaimer before public launch |
| Home | Office location | Review the supplied location details | Gives local visitors transparent access to unverified location notes | Itahari location band | Route exists; page is noindex | Confirm exact address and map pin |
| Home | Contact | View contact information and review notes | Shows why no call link/form is offered yet | Next conversation section | Route exists; page is noindex | Verify phone and contact method |
| Home | Japan | Japan destination card | Matches reader interest with the Japan guide | Destination cards | Route exists; official links present | Recheck official links periodically |
| Home | Australia | Australia destination card | Matches reader interest with the Australia guide | Destination cards | Route exists; official link present | Recheck official link periodically |
| Home | USA | United States destination card | Matches reader interest with the U.S. guide | Destination cards | Route exists; official links present | Recheck official links periodically |
| Itahari consultancy | Destinations and services | Browse destinations and services | Moves from local intent to destination comparison | Lower-page band | Route exists; service scope caveat visible | Confirm specific services |
| Japan | Itahari consultancy | See HIKARI’s Itahari page | Provides local context after official research guidance | Lower-page band | Route exists; descriptive anchor | Confirm service scope |
| Australia | Destinations and services | Compare all listed destinations | Helps a reader compare country pages after Australia research | Lower-page band | Route exists; descriptive anchor | Confirm service scope |
| USA | Visa and admissions disclaimer | Read the visa and admissions disclaimer | Clarifies official decision authority | Lower-page band | Route exists; disclaimer page present | Review disclaimer before public launch |
| Destinations and services | Japan | Japan destination card | Opens the country-specific source list | Destination cards | Route exists | Recheck official sources |
| Destinations and services | Australia | Australia destination card | Opens the country-specific source list | Destination cards | Route exists | Recheck official source |
| Destinations and services | USA | United States destination card | Opens the country-specific source list | Destination cards | Route exists | Recheck official sources |
| Destinations and services | Application and visa guidance | See the clearly marked draft | Makes unconfirmed service status transparent | Draft service note | Route exists; noindex meta | Confirm or remove proposed service |
| About | Destinations and services | Explore the three destinations | Gives the reader a relevant next step | Lower-page band | Route exists | Confirm service scope |
| Contact | Office location | Review location notes | Connects related contact and address verification information | Contact page final section | Route exists; both pages noindex | Verify contact and address details |
| Office location | Contact | See contact verification notes | Provides the related contact review note | Directions page final section | Route exists; both pages noindex | Verify working contact route |
| FAQs | Official destination guide | Official source linked on the page for the destination | Sends current-rule questions to destination-specific official links | FAQ answer | Destination routes exist | Keep date checked current |
| Any page | Itahari consultancy | About the Itahari consultancy | Offers the local business context as a common next step | Closing call to action | Route exists | Confirm display name and scope |
| Any page | Contact | Contact information | Provides a common next step while clearly flagging verification | Closing call to action | Route exists; noindex | Confirm a usable contact channel |
| Planned local articles | Study abroad consultancy in Itahari | Use the page title where natural | Connects local planning questions to the local core page | Supplementary section only when useful | Article routes not created | Validate query and confirm service relationship |
| Planned destination articles | Matching destination page | Use the destination page title where natural | Connects the reader question to the relevant country guide | Supplementary section only when useful | Article routes not created | Verify official sources and date checked |
| Planned application articles | Student application and visa guidance | Use service page title only after confirmation | Connects cross-destination application questions to one parent | Hold until scope confirmed | Parent route exists but is noindex draft | Confirm service, scope, privacy and fees |

## QA notes

- The running server route list is the source of truth for internal destinations.
- Every page has generated site navigation and footer links; all contextual paths above are direct route links.
- Official external links use HTTPS and open in a new tab with `rel="noopener noreferrer"`.
- Application and visa guidance remains noindex and is omitted from the sitemap pending owner confirmation.
- Contact, location and policy drafts are noindex until their required owner checks are completed.
