# 환경변수
- .env 파일에 어떤 환경변수가 추가되어야 하는지 작성합니다.

- DATABASE_URL

# API 명세서 URL
- https://certain-editor-a97.notion.site/69cd8fd403944e969b3435aa18f8195b?v=7684c233c0794186a3ab2a4de5b7dd36

# ERD URL
- https://drawsql.app/teams/jaeheons-team/diagrams/product-resume

# 더 고민해 보기
1. **암호화 방식**
    - 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 단방향 암호화와 양방향 암호화 중 어떤 암호화 방식에 해당할까요?
    
      A: 단방향 암호화입니다.
    - 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?
    
      A: 비밀번호 노출을 방지합니다. 즉, 보안이 강화되는 장점이 있습니다.

2. **인증 방식**
    - JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?
    
      A: 해킹 위험이 있습니다. 제 계정을 마음대로 쓰겠죠.
    - 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?
    
      A: 유효기간을 짧게주기 sessionStorage 사용하기.

3. **인증과 인가**
    - 인증과 인가가 무엇인지 각각 설명해 주세요.
    
      A: 인증은 로그인할 때 인증된 신분을 가진 사람인지 확인하는 것입니다.
    
      즉, 회원가입에서 입력받은 ID, PASSWORD를 제대로 입력했는지 인증하는 단계라고 생각합니다.
    
      인가는 특정 작업을 수행할 수 있는 권한이 있는지 검증하는 것입니다.
    
      즉, 로그인 한 사용자만이 내 이력서를 작성할 수 있는지에 대한 검증 과정입니다.

    - 과제에서 구현한 Middleware는 인증에 해당하나요? 인가에 해당하나요? 그 이유도 알려주세요.
    
      A: 인가입니다. 토큰을 비교하고 검증함으로써 수행 권한이 있는지 확인하는 과정이기 때문입니다.

4. **Http Status Code**
    - 과제를 진행하면서 사용한 Http Status Code를 모두 나열하고, 각각이 의미하는 것과 어떤 상황에 사용했는지 작성해 주세요.
    
      400: 유효성 검사에 실패했을 경우
    
      401: 인증에 실패했을 경우  
    
      404: 데이터를 찾을 수 없을 경우
    
      200: 요청이 완료되었을 경우  
    
      201: 요청이 완료되고 새로운 리소스가 생성되었을 경우(post,put,del)

5. **리팩토링**
    - MySQL, Prisma로 개발했는데 MySQL을 MongoDB로 혹은 Prisma 를 TypeORM 로 변경하게 된다면 많은 코드 변경이 필요할까요? 주로 어떤 코드에서 변경이 필요한가요?
    
      A: DB쿼리와 라이브러리 호출시 사용되는 메소드들이 다 달라서 많은 부분 변경이 필요해보입니다.
    
    - 만약 이렇게 DB를 변경하는 경우가 또 발생했을 때, 코드 변경을 보다 쉽게 하려면 어떻게 코드를 작성하면 좋을 지 생각나는 방식이 있나요? 있다면 작성해 주세요.
    
      A: .env를 활용해서 변경부분 줄이기, 주석처리해서 쉽게 알아볼 수 있게하기


6. **API 명세서**
    - notion 혹은 엑셀에 작성하여 전달하는 것 보다 swagger 를 통해 전달하면 장점은 무엇일까요?

7. **PS**
    - 모든 이력서 조회에는 resumeIntro를 넣지 않았습니다. 이유는 개인적으로 상세조회라는 개념에 차별점이 있어야 된다고 생각했습니다.

      근데 다시 생각해보면 (여러건), (단편)이라는 조건이 있었기 때문에 요구사항을 제대로 따르지 않았나라는 생각이듭니다.

      마찬가지로 Table도 Users, Resume만 있어도 되는데 조회라는 개념을 조금 더 맛있게 만들어보고 싶었던 것 같습니다.

      강의에서 배운 내용도 써먹고 싶었다는 생각도 있었구요. 다음엔 요구사항을 좀 더 꼼꼼히 보고 제대로 이행해야겠다는 생각입니다.

