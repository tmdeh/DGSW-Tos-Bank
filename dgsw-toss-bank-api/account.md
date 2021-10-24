---
description: 계좌
---

# Account

## 계좌 생성

{% swagger method="post" path="/" baseUrl="http://10.80.162.103:8000/account" summary="계좌 생성" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="name" type="String" required="true" %}
계좌 이름
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" type="int" required="true" %}
4자리 비밀번호
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="계좌 생성 성공" %}
```javascript
{
    "msg" : "OK"
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="계좌 이름이 너무 길거나 짧을 경우" %}
```javascript
{
    "msg": "계좌 이름이 너무 짧거나 깁니다."
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="비밀번호가 4자리가 아닌 경우" %}
```javascript
{
    "msg": "password가 너무 짧거나 깁니다."
}
```
{% endswagger-response %}
{% endswagger %}

## 계좌 조회

{% swagger method="get" path="/" baseUrl="http://10.80.162.103:8000/account" summary="계좌 조회" %}
{% swagger-description %}
아직 다른 서버들과의 api가 정해지지 않아 tosbank의 조회만 됩니다.
{% endswagger-description %}

{% swagger-response status="200: OK" description="불러오기 성공" %}
```javascript
{
    "msg": "OK",
    "data": [
        {
            "bankName": "tos",
            "accountNumber": "666-0250-0132",
            "money": 1000
        },
        {
            "bankName": "tos",
            "accountNumber": "666-0401-0144",
            "money": 10000
        },
        {
            "bankName": "tos",
            "accountNumber": "666-0882-0230",
            "money": 10000
        },
        {
            "bankName": "tos",
            "accountNumber": "666-0349-0637",
            "money": 10000
        }
    ]
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="토큰이 만료되어 불러올 수 없음" %}
```javascript
{
    "err": {
        "name": "TokenExpiredError",
        "message": "jwt expired",
        "expiredAt": "2021-10-18T04:29:04.000Z"
    }
}
```
{% endswagger-response %}
{% endswagger %}



## 계좌 삭제

{% swagger method="delete" path="/" baseUrl="http://10.80.162.103:8000/account" summary="계좌 삭제" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="accountNumber" required="true" type="String" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" type="int" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}
