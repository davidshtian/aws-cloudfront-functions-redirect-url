## Amazon CloudFront Functions for URL Redirect

### Background

As user of Amazon CloudFront has some requirement to redict one URL to the expected URL, usually this can be done via origin web servers, while this would impact a lot at user experiences. An alternative option to achieve this goal is redirecting URL at edge. Here comes the CloudFront Functions. For more details about CloudFront Functions, please refer to the [AWS official docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html) or the [launch blog](https://aws.amazon.com/blogs/aws/introducing-cloudfront-functions-run-your-code-at-the-edge-with-low-latency-at-any-scale/).

CloudFront Functions and Lambda@Edge:
![image](https://user-images.githubusercontent.com/14228056/141926456-fa651f4d-529d-44ab-b946-4718fcfff6f7.png)

CloudFront Functions vs Lambda@Edge:
![image](https://user-images.githubusercontent.com/14228056/141926371-1d224694-8ff8-40e8-8c60-dd07829f96b6.png)

### Root Domain at CloudFront

Another requirement is to use Amazon CloudFront to deliver content from the root domain, or "zone apex" of the website. For example, to configure both http://www.example.com and http://example.com to point at the same CloudFront distribution. This is also [support by CloudFront](https://aws.amazon.com/about-aws/whats-new/2013/06/11/announcing-custom-ssl-certificates-and-zone-apex-support-for-cloudfront/) long time ago, implemented by Route53 Alias record.

Normally, users need to redict root domain to a comman domain, such as from *https://example.com* to *http://www.example.com*, and this solution could also help with this scenario.

### Usage
Develop and Publish the function in CloudFront:
![image](https://user-images.githubusercontent.com/14228056/141926625-18371e63-5702-46d8-8880-7d5151735009.png)


### Notes
As this redirect considered URL and query strings in the request, and an HTTP request or response can contain more than one query string at the same name. In this case, the duplicate query strings are collapsed into one field in the request or response object, but this field contains an extra property named ***multiValue***. The multiValue property contains an array with the values of each of the duplicate query strings. This function leveraged the built-in query string module *querystring* for parsing and formatting URL query strings. 

- For more details about multiValue and event structure, please refer to [CloudFront Functions event structure docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html).
- For more details about JavaScript runtime features, please refer to [JavaScript runtime features for CloudFront Functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-javascript-runtime-features.html).
