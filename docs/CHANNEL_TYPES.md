# Channel Types

In DZ Messages all channels have a different type. This helps to see which channel is a DM or a server channel. In the
following table you can see the Number and its enum.

| Number | Type         |
|--------|--------------|
| 0      | DM           |
| 1      | Group        |
| 2      | Channel      |
| 3      | Voice        |
| 4      | Announcement |

## Paths
````http request
https://messages.dz-cloud.de/api/v1/channels/{{cid}}
````

## Code Snippets
### TypeScript
````typescript
enum CHANNEL_TYPES {DM, GROUP, CHANNEL, VOICE, ANNOUNCEMENT}
````

### Java
```java
public enum ChannelTypes {DM, GROUP, CHANNEL, VOICE, ANNOUNCEMENT}
```

### Kotlin
````kotlin
enum class ChannelTypes {DM,GROUP,CHANNEL,VOICE,ANNOUNCEMENT}
````

### Python
`````python
class ChannelTypes(Enum):
    DM = 1
    GROUP = 2
    CHANNEL = 3
    VOICE = 4
    ANNOUNCEMENT = 5
`````

## Samples

To use the code you can use fetch for ``TypeScript``.

````typescript
fetch("api/v1/channels/CID")
    .then(res => res.json())
    .then(data => {
        console.log(data.type)
    })
    .catch(err => {
        console.error(err);
    })
````