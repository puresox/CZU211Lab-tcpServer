# CZU211Lab_tcpServer

tcp 服务器

## 接口定义

接口格式：UTF-8 字符串组成的JSON

### 接口数据格式：

```javascript
{
	"type":"auth",
	"data":...
}
```

| type          | 发送方-接收方             | data                     | 说明                     |
| ------------- | ------------------------- | ------------------------ | ------------------------ |
| auth          | unity/brain/doctor-server | 'unity'/'brain'/'doctor' | 身份识别                 |
| attentionData | brain-server              | 'ff'                     | 注意力数据，16进制字符串 |
| attentionData | server-unity              | '255'                    | 注意力数据，10进制字符串 |
| controllData  | doctor-server             |                          |                          |
| controllData  | server-unity              |                          |                          |
|               |                           |                          |                          |
|               |                           |                          |                          |

注：unity/brain/doctor是三个客户端。